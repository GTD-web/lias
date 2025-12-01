import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TemplateContext } from '../../../context/template/template.context';
import { CreateTemplateDto, ApprovalStepTemplateItemDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto, UpdateApprovalStepTemplateItemDto } from '../dtos/update-template.dto';
import {
    CreateDocumentTemplateDto,
    CreateApprovalStepTemplateDto,
    UpdateDocumentTemplateDto,
    UpdateApprovalStepTemplateDto,
} from '../../../context/template/dtos/template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
import { withTransaction } from '../../../../common/utils/transaction.util';

/**
 * 템플릿 비즈니스 서비스
 * 문서 템플릿과 결재단계 템플릿을 함께 관리하는 비즈니스 로직을 담당합니다.
 */
@Injectable()
export class TemplateService {
    private readonly logger = new Logger(TemplateService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly templateContext: TemplateContext,
    ) {}

    /**
     * 문서 템플릿과 결재단계 템플릿을 함께 생성
     * 하나의 트랜잭션으로 처리됩니다.
     */
    async createTemplateWithApprovalSteps(dto: CreateTemplateDto) {
        this.logger.log(`템플릿 생성 시작: ${dto.name}`);

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 1. 문서 템플릿 생성
            const documentTemplateDto: CreateDocumentTemplateDto = {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template,
                status: DocumentTemplateStatus.ACTIVE,
                categoryId: dto.categoryId,
            };

            const documentTemplate = await this.templateContext.createDocumentTemplate(
                documentTemplateDto,
                queryRunner,
            );

            // 2. 결재단계 템플릿들 생성
            const approvalSteps = [];
            for (let i = 0; i < dto.approvalSteps.length; i++) {
                const stepDto = dto.approvalSteps[i];
                const approvalStepDto: CreateApprovalStepTemplateDto = {
                    documentTemplateId: documentTemplate.id,
                    stepOrder: stepDto.stepOrder ?? i + 1, // 순서가 지정되지 않으면 자동으로 1부터 시작
                    stepType: stepDto.stepType,
                    assigneeRule: stepDto.assigneeRule,
                    targetEmployeeId: stepDto.targetEmployeeId,
                    targetDepartmentId: stepDto.targetDepartmentId,
                    targetPositionId: stepDto.targetPositionId,
                };

                const approvalStep = await this.templateContext.createApprovalStepTemplate(
                    approvalStepDto,
                    queryRunner,
                );
                approvalSteps.push(approvalStep);
            }

            this.logger.log(`템플릿 생성 완료: ${documentTemplate.id}, 결재단계 ${approvalSteps.length}개 생성`);

            return {
                documentTemplate,
                approvalSteps,
            };
        });
    }

    /**
     * 카테고리 생성
     */
    async createCategory(dto: CreateCategoryDto) {
        this.logger.log(`카테고리 생성: ${dto.name}`);
        return await this.templateContext.createCategory(dto);
    }

    /**
     * 카테고리 목록 조회
     */
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');
        return await this.templateContext.getCategories();
    }

    /**
     * 카테고리 상세 조회
     */
    async getCategory(categoryId: string) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);
        return await this.templateContext.getCategory(categoryId);
    }

    /**
     * 카테고리 수정
     */
    async updateCategory(categoryId: string, dto: UpdateCategoryDto) {
        this.logger.log(`카테고리 수정: ${categoryId}`);
        return await this.templateContext.updateCategory(categoryId, dto);
    }

    /**
     * 카테고리 삭제
     */
    async deleteCategory(categoryId: string) {
        this.logger.log(`카테고리 삭제: ${categoryId}`);
        return await this.templateContext.deleteCategory(categoryId);
    }

    /**
     * 문서 템플릿 목록 조회 (검색, 페이지네이션, 정렬 포함)
     */
    async getTemplates(query: {
        searchKeyword?: string;
        categoryId?: string;
        // status?: DocumentTemplateStatus;
        sortOrder?: 'LATEST' | 'OLDEST';
        page?: number;
        limit?: number;
    }) {
        this.logger.debug(`템플릿 목록 조회: ${JSON.stringify(query)}`);
        return await this.templateContext.getDocumentTemplates(query);
    }

    /**
     * 문서 템플릿 상세 조회
     */
    async getTemplate(templateId: string) {
        this.logger.debug(`템플릿 조회: ${templateId}`);
        return await this.templateContext.getDocumentTemplate(templateId);
    }

    /**
     * 문서 템플릿 수정 (결재단계 템플릿 포함)
     * 하나의 트랜잭션으로 처리됩니다.
     */
    async updateTemplate(templateId: string, dto: UpdateTemplateDto) {
        this.logger.log(`템플릿 수정 시작: ${templateId}`);

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 1. 문서 템플릿 수정
            const updateDto: UpdateDocumentTemplateDto = {
                name: dto.name,
                description: dto.description,
                template: dto.template,
                // status: DocumentTemplateStatus.ACTIVE,
                categoryId: dto.categoryId,
            };
            await this.templateContext.updateDocumentTemplate(templateId, updateDto, queryRunner);

            // 2. 결재단계 템플릿 수정 (approvalSteps가 제공된 경우에만)
            if (dto.approvalSteps !== undefined) {
                // 기존 결재단계 템플릿 조회
                const existingSteps = await this.templateContext.getApprovalStepTemplatesByDocumentTemplate(templateId);
                const existingStepIds = new Set(existingSteps.map((step) => step.id));

                // 요청에 포함된 step ID들
                const requestedStepIds = new Set(dto.approvalSteps.filter((step) => step.id).map((step) => step.id!));

                // 삭제할 step들 (기존에 있지만 요청에 없는 것)
                const stepsToDelete = existingSteps.filter((step) => !requestedStepIds.has(step.id));
                for (const step of stepsToDelete) {
                    await this.templateContext.deleteApprovalStepTemplate(step.id, queryRunner);
                }

                // 수정 및 생성
                for (let i = 0; i < dto.approvalSteps.length; i++) {
                    const stepDto = dto.approvalSteps[i];

                    if (stepDto.id && existingStepIds.has(stepDto.id)) {
                        // 기존 step 수정
                        const updateStepDto: UpdateApprovalStepTemplateDto = {
                            stepOrder: stepDto.stepOrder ?? i + 1,
                            stepType: stepDto.stepType,
                            assigneeRule: stepDto.assigneeRule,
                            targetEmployeeId: stepDto.targetEmployeeId ?? null,
                            targetDepartmentId: stepDto.targetDepartmentId ?? null,
                            targetPositionId: stepDto.targetPositionId ?? null,
                        };
                        await this.templateContext.updateApprovalStepTemplate(stepDto.id, updateStepDto, queryRunner);
                    } else {
                        // 새 step 생성
                        const createStepDto: CreateApprovalStepTemplateDto = {
                            documentTemplateId: templateId,
                            stepOrder: stepDto.stepOrder ?? i + 1,
                            stepType: stepDto.stepType,
                            assigneeRule: stepDto.assigneeRule,
                            targetEmployeeId: stepDto.targetEmployeeId,
                            targetDepartmentId: stepDto.targetDepartmentId,
                            targetPositionId: stepDto.targetPositionId,
                        };
                        await this.templateContext.createApprovalStepTemplate(createStepDto, queryRunner);
                    }
                }

                this.logger.log(
                    `템플릿 수정 완료: ${templateId}, 결재단계 ${dto.approvalSteps.length}개 처리, ${stepsToDelete.length}개 삭제`,
                );
            } else {
                this.logger.log(`템플릿 수정 완료: ${templateId}`);
            }

            // 최종 템플릿 정보 반환 (결재단계 포함)
            return await this.templateContext.getDocumentTemplate(templateId);
        });
    }

    /**
     * 문서 템플릿 삭제
     */
    async deleteTemplate(templateId: string) {
        this.logger.log(`템플릿 삭제: ${templateId}`);
        return await this.templateContext.deleteDocumentTemplate(templateId);
    }
}
