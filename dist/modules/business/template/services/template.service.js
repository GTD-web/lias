"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TemplateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const template_context_1 = require("../../../context/template/template.context");
const template_query_service_1 = require("../../../context/template/template-query.service");
const approver_mapping_service_1 = require("../../../context/template/approver-mapping.service");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const transaction_util_1 = require("../../../../common/utils/transaction.util");
let TemplateService = TemplateService_1 = class TemplateService {
    constructor(dataSource, templateContext, templateQueryService, approverMappingService) {
        this.dataSource = dataSource;
        this.templateContext = templateContext;
        this.templateQueryService = templateQueryService;
        this.approverMappingService = approverMappingService;
        this.logger = new common_1.Logger(TemplateService_1.name);
    }
    async createTemplateWithApprovalSteps(dto) {
        this.logger.log(`템플릿 생성 시작: ${dto.name}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const documentTemplateDto = {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template,
                status: approval_enum_1.DocumentTemplateStatus.ACTIVE,
                categoryId: dto.categoryId,
            };
            const documentTemplate = await this.templateContext.createDocumentTemplate(documentTemplateDto, queryRunner);
            const approvalSteps = [];
            for (let i = 0; i < dto.approvalSteps.length; i++) {
                const stepDto = dto.approvalSteps[i];
                const approvalStepDto = {
                    documentTemplateId: documentTemplate.id,
                    stepOrder: stepDto.stepOrder ?? i + 1,
                    stepType: stepDto.stepType,
                    assigneeRule: stepDto.assigneeRule,
                    targetEmployeeId: stepDto.targetEmployeeId,
                    targetDepartmentId: stepDto.targetDepartmentId,
                    targetPositionId: stepDto.targetPositionId,
                };
                const approvalStep = await this.templateContext.createApprovalStepTemplate(approvalStepDto, queryRunner);
                approvalSteps.push(approvalStep);
            }
            this.logger.log(`템플릿 생성 완료: ${documentTemplate.id}, 결재단계 ${approvalSteps.length}개 생성`);
            return {
                documentTemplate,
                approvalSteps,
            };
        });
    }
    async updateTemplate(templateId, dto) {
        this.logger.log(`템플릿 수정 시작: ${templateId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const updateDto = {
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template,
                categoryId: dto.categoryId,
            };
            await this.templateContext.updateDocumentTemplate(templateId, updateDto, queryRunner);
            if (dto.approvalSteps !== undefined) {
                const existingSteps = await this.templateQueryService.getApprovalStepTemplatesByDocumentTemplate(templateId);
                const existingStepIds = new Set(existingSteps.map((step) => step.id));
                const requestedStepIds = new Set(dto.approvalSteps.filter((step) => step.id).map((step) => step.id));
                const stepsToDelete = existingSteps.filter((step) => !requestedStepIds.has(step.id));
                for (const step of stepsToDelete) {
                    await this.templateContext.deleteApprovalStepTemplate(step.id, queryRunner);
                }
                for (let i = 0; i < dto.approvalSteps.length; i++) {
                    const stepDto = dto.approvalSteps[i];
                    if (stepDto.id && existingStepIds.has(stepDto.id)) {
                        const updateStepDto = {
                            stepOrder: stepDto.stepOrder ?? i + 1,
                            stepType: stepDto.stepType,
                            assigneeRule: stepDto.assigneeRule,
                            targetEmployeeId: stepDto.targetEmployeeId ?? null,
                            targetDepartmentId: stepDto.targetDepartmentId ?? null,
                            targetPositionId: stepDto.targetPositionId ?? null,
                        };
                        await this.templateContext.updateApprovalStepTemplate(stepDto.id, updateStepDto, queryRunner);
                    }
                    else {
                        const createStepDto = {
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
                this.logger.log(`템플릿 수정 완료: ${templateId}, 결재단계 ${dto.approvalSteps.length}개 처리, ${stepsToDelete.length}개 삭제`);
            }
            else {
                this.logger.log(`템플릿 수정 완료: ${templateId}`);
            }
            return await this.templateQueryService.getDocumentTemplate(templateId);
        });
    }
    async deleteTemplate(templateId) {
        this.logger.log(`템플릿 삭제: ${templateId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            await this.templateContext.deleteDocumentTemplate(templateId, queryRunner);
        });
    }
    async getTemplates(query) {
        this.logger.debug(`템플릿 목록 조회: ${JSON.stringify(query)}`);
        return await this.templateQueryService.getDocumentTemplates(query);
    }
    async getTemplate(templateId) {
        this.logger.debug(`템플릿 조회: ${templateId}`);
        return await this.templateQueryService.getDocumentTemplate(templateId);
    }
    async getTemplateWithMappedApprovers(templateId, drafterId) {
        this.logger.debug(`템플릿 조회 (결재자 매핑): ${templateId}, 기안자: ${drafterId}`);
        return await this.approverMappingService.getDocumentTemplateWithMappedApprovers(templateId, drafterId);
    }
    async createCategory(dto) {
        this.logger.log(`카테고리 생성: ${dto.name}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            return await this.templateContext.createCategory(dto, queryRunner);
        });
    }
    async updateCategory(categoryId, dto) {
        this.logger.log(`카테고리 수정: ${categoryId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            return await this.templateContext.updateCategory(categoryId, dto, queryRunner);
        });
    }
    async deleteCategory(categoryId) {
        this.logger.log(`카테고리 삭제: ${categoryId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            return await this.templateContext.deleteCategory(categoryId, queryRunner);
        });
    }
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');
        return await this.templateQueryService.getCategories();
    }
    async getCategory(categoryId) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);
        return await this.templateQueryService.getCategory(categoryId);
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = TemplateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        template_context_1.TemplateContext,
        template_query_service_1.TemplateQueryService,
        approver_mapping_service_1.ApproverMappingService])
], TemplateService);
//# sourceMappingURL=template.service.js.map