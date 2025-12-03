import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainCategoryService } from '../../domain/category/category.service';
import { ApprovalRuleValidator } from '../../../common/utils/approval-rule-validator';
import {
    CreateDocumentTemplateDto,
    UpdateDocumentTemplateDto,
    CreateApprovalStepTemplateDto,
    UpdateApprovalStepTemplateDto,
} from './dtos/template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { DocumentTemplateStatus } from 'src/common/enums/approval.enum';

/**
 * 템플릿 컨텍스트
 *
 * 역할:
 * - 문서 템플릿 CRUD
 * - 결재단계 템플릿 CRUD
 * - 카테고리 CRUD
 * - 결재 규칙 검증
 */
@Injectable()
export class TemplateContext {
    private readonly logger = new Logger(TemplateContext.name);

    constructor(
        private readonly documentTemplateService: DomainDocumentTemplateService,
        private readonly approvalStepTemplateService: DomainApprovalStepTemplateService,
        private readonly categoryService: DomainCategoryService,
    ) {}

    // ==================== 문서 템플릿 CRUD ====================

    /**
     * 문서 템플릿 생성
     */
    async createDocumentTemplate(dto: CreateDocumentTemplateDto, queryRunner?: QueryRunner) {
        this.logger.log(`문서 템플릿 생성 시작: ${dto.name}`);

        // 카테고리 존재 확인 (있는 경우)
        if (dto.categoryId) {
            await this.categoryService.findOneWithError({
                where: { id: dto.categoryId },
                queryRunner,
            });
        }

        // 문서 템플릿 생성
        const template = await this.documentTemplateService.createDocumentTemplate(
            {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template || '',
                status: DocumentTemplateStatus.ACTIVE,
                categoryId: dto.categoryId,
            },
            queryRunner,
        );

        this.logger.log(`문서 템플릿 생성 완료: ${template.id}`);
        return template;
    }

    /**
     * 문서 템플릿 수정
     */
    async updateDocumentTemplate(templateId: string, dto: UpdateDocumentTemplateDto, queryRunner?: QueryRunner) {
        this.logger.log(`문서 템플릿 수정 시작: ${templateId}`);

        // 템플릿 조회
        const template = await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            queryRunner,
        });

        // 카테고리 존재 확인 (있는 경우)
        if (dto.categoryId) {
            await this.categoryService.findOneWithError({
                where: { id: dto.categoryId },
                queryRunner,
            });
        }

        // 템플릿 수정
        const updatedTemplate = await this.documentTemplateService.updateDocumentTemplate(
            template,
            {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template,
                status: dto.status,
                categoryId: dto.categoryId,
            },
            queryRunner,
        );

        this.logger.log(`문서 템플릿 수정 완료: ${templateId}`);
        return updatedTemplate;
    }

    /**
     * 문서 템플릿 삭제
     */
    async deleteDocumentTemplate(templateId: string, queryRunner?: QueryRunner) {
        this.logger.log(`문서 템플릿 삭제 시작: ${templateId}`);

        // 템플릿 존재 확인
        await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            queryRunner,
        });

        // 템플릿 삭제 (cascade로 결재단계 템플릿도 함께 삭제됨)
        await this.documentTemplateService.delete(templateId, { queryRunner });

        this.logger.log(`문서 템플릿 삭제 완료: ${templateId}`);
    }

    // ==================== 결재단계 템플릿 CRUD ====================

    /**
     * 결재단계 템플릿 생성
     */
    async createApprovalStepTemplate(dto: CreateApprovalStepTemplateDto, queryRunner?: QueryRunner) {
        this.logger.log(`결재단계 템플릿 생성 시작: documentTemplateId=${dto.documentTemplateId}`);

        // 문서 템플릿 존재 확인
        await this.documentTemplateService.findOneWithError({
            where: { id: dto.documentTemplateId },
            queryRunner,
        });

        // 결재 규칙 검증
        const validation = ApprovalRuleValidator.validateComplete(dto.stepType, dto.assigneeRule, {
            targetEmployeeId: dto.targetEmployeeId,
            targetDepartmentId: dto.targetDepartmentId,
            targetPositionId: dto.targetPositionId,
        });

        if (!validation.isValid) {
            throw new BadRequestException(validation.errors.join(', '));
        }

        // 결재단계 템플릿 생성
        const approvalStepTemplate = await this.approvalStepTemplateService.createApprovalStepTemplate(
            {
                documentTemplateId: dto.documentTemplateId,
                stepOrder: dto.stepOrder,
                stepType: dto.stepType,
                assigneeRule: dto.assigneeRule,
                targetEmployeeId: dto.targetEmployeeId,
                targetDepartmentId: dto.targetDepartmentId,
                targetPositionId: dto.targetPositionId,
            },
            queryRunner,
        );

        this.logger.log(`결재단계 템플릿 생성 완료: ${approvalStepTemplate.id}`);
        return approvalStepTemplate;
    }

    /**
     * 결재단계 템플릿 수정
     */
    async updateApprovalStepTemplate(stepId: string, dto: UpdateApprovalStepTemplateDto, queryRunner?: QueryRunner) {
        this.logger.log(`결재단계 템플릿 수정 시작: ${stepId}`);

        // 결재단계 템플릿 조회
        const step = await this.approvalStepTemplateService.findOneWithError({
            where: { id: stepId },
            queryRunner,
        });

        // 결재 규칙 검증 (변경된 경우)
        const stepType = dto.stepType || step.stepType;
        const assigneeRule = dto.assigneeRule || step.assigneeRule;
        const targetEmployeeId = dto.targetEmployeeId !== undefined ? dto.targetEmployeeId : step.targetEmployeeId;
        const targetDepartmentId =
            dto.targetDepartmentId !== undefined ? dto.targetDepartmentId : step.targetDepartmentId;
        const targetPositionId = dto.targetPositionId !== undefined ? dto.targetPositionId : step.targetPositionId;

        const validation = ApprovalRuleValidator.validateComplete(stepType, assigneeRule, {
            targetEmployeeId: targetEmployeeId || undefined,
            targetDepartmentId: targetDepartmentId || undefined,
            targetPositionId: targetPositionId || undefined,
        });

        if (!validation.isValid) {
            throw new BadRequestException(validation.errors.join(', '));
        }

        // 결재단계 템플릿 수정
        const updatedStep = await this.approvalStepTemplateService.updateApprovalStepTemplate(
            step,
            {
                stepOrder: dto.stepOrder,
                stepType: dto.stepType,
                assigneeRule: dto.assigneeRule,
                targetEmployeeId: dto.targetEmployeeId,
                targetDepartmentId: dto.targetDepartmentId,
                targetPositionId: dto.targetPositionId,
            },
            queryRunner,
        );

        this.logger.log(`결재단계 템플릿 수정 완료: ${stepId}`);
        return updatedStep;
    }

    /**
     * 결재단계 템플릿 삭제
     */
    async deleteApprovalStepTemplate(stepId: string, queryRunner?: QueryRunner) {
        this.logger.log(`결재단계 템플릿 삭제 시작: ${stepId}`);

        // 결재단계 템플릿 존재 확인
        await this.approvalStepTemplateService.findOneWithError({
            where: { id: stepId },
            queryRunner,
        });

        // 삭제
        await this.approvalStepTemplateService.delete(stepId, { queryRunner });

        this.logger.log(`결재단계 템플릿 삭제 완료: ${stepId}`);
    }

    // ==================== 카테고리 CRUD ====================

    /**
     * 카테고리 생성
     */
    async createCategory(dto: CreateCategoryDto, queryRunner?: QueryRunner) {
        this.logger.log(`카테고리 생성 시작: ${dto.name}`);

        // 코드 중복 확인
        const existing = await this.categoryService.findOne({
            where: { code: dto.code },
            queryRunner,
        });

        if (existing) {
            throw new BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
        }

        // 카테고리 생성
        const category = await this.categoryService.createCategory(
            {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                order: dto.order || 0,
            },
            queryRunner,
        );

        this.logger.log(`카테고리 생성 완료: ${category.id}`);
        return category;
    }

    /**
     * 카테고리 수정
     */
    async updateCategory(categoryId: string, dto: UpdateCategoryDto, queryRunner?: QueryRunner) {
        this.logger.log(`카테고리 수정 시작: ${categoryId}`);

        // 카테고리 조회
        const category = await this.categoryService.findOneWithError({
            where: { id: categoryId },
            queryRunner,
        });

        // 코드 중복 확인 (코드 변경 시)
        if (dto.code && dto.code !== category.code) {
            const existing = await this.categoryService.findOne({
                where: { code: dto.code },
                queryRunner,
            });

            if (existing) {
                throw new BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
            }
        }

        // 카테고리 수정
        const updatedCategory = await this.categoryService.updateCategory(
            category,
            {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                order: dto.order,
            },
            queryRunner,
        );

        this.logger.log(`카테고리 수정 완료: ${categoryId}`);
        return updatedCategory;
    }

    /**
     * 카테고리 삭제
     */
    async deleteCategory(categoryId: string, queryRunner?: QueryRunner) {
        this.logger.log(`카테고리 삭제 시작: ${categoryId}`);

        // 카테고리 존재 확인
        const category = await this.categoryService.findOneWithError({
            where: { id: categoryId },
            relations: ['documentTemplates'],
            queryRunner,
        });

        // 카테고리에 속한 템플릿이 있는지 확인
        if (category.documentTemplates && category.documentTemplates.length > 0) {
            throw new BadRequestException(
                `카테고리에 속한 문서 템플릿이 ${category.documentTemplates.length}개 있어 삭제할 수 없습니다.`,
            );
        }

        // 카테고리 삭제
        await this.categoryService.delete(categoryId, { queryRunner });

        this.logger.log(`카테고리 삭제 완료: ${categoryId}`);
    }
}
