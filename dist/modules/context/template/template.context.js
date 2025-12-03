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
var TemplateContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateContext = void 0;
const common_1 = require("@nestjs/common");
const document_template_service_1 = require("../../domain/document-template/document-template.service");
const approval_step_template_service_1 = require("../../domain/approval-step-template/approval-step-template.service");
const category_service_1 = require("../../domain/category/category.service");
const approval_rule_validator_1 = require("../../../common/utils/approval-rule-validator");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let TemplateContext = TemplateContext_1 = class TemplateContext {
    constructor(documentTemplateService, approvalStepTemplateService, categoryService) {
        this.documentTemplateService = documentTemplateService;
        this.approvalStepTemplateService = approvalStepTemplateService;
        this.categoryService = categoryService;
        this.logger = new common_1.Logger(TemplateContext_1.name);
    }
    async createDocumentTemplate(dto, queryRunner) {
        this.logger.log(`문서 템플릿 생성 시작: ${dto.name}`);
        if (dto.categoryId) {
            await this.categoryService.findOneWithError({
                where: { id: dto.categoryId },
                queryRunner,
            });
        }
        const template = await this.documentTemplateService.createDocumentTemplate({
            name: dto.name,
            code: dto.code,
            description: dto.description,
            template: dto.template || '',
            status: approval_enum_1.DocumentTemplateStatus.ACTIVE,
            categoryId: dto.categoryId,
        }, queryRunner);
        this.logger.log(`문서 템플릿 생성 완료: ${template.id}`);
        return template;
    }
    async updateDocumentTemplate(templateId, dto, queryRunner) {
        this.logger.log(`문서 템플릿 수정 시작: ${templateId}`);
        const template = await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            queryRunner,
        });
        if (dto.categoryId) {
            await this.categoryService.findOneWithError({
                where: { id: dto.categoryId },
                queryRunner,
            });
        }
        const updatedTemplate = await this.documentTemplateService.updateDocumentTemplate(template, {
            name: dto.name,
            code: dto.code,
            description: dto.description,
            template: dto.template,
            status: dto.status,
            categoryId: dto.categoryId,
        }, queryRunner);
        this.logger.log(`문서 템플릿 수정 완료: ${templateId}`);
        return updatedTemplate;
    }
    async deleteDocumentTemplate(templateId, queryRunner) {
        this.logger.log(`문서 템플릿 삭제 시작: ${templateId}`);
        await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            queryRunner,
        });
        await this.documentTemplateService.delete(templateId, { queryRunner });
        this.logger.log(`문서 템플릿 삭제 완료: ${templateId}`);
    }
    async createApprovalStepTemplate(dto, queryRunner) {
        this.logger.log(`결재단계 템플릿 생성 시작: documentTemplateId=${dto.documentTemplateId}`);
        await this.documentTemplateService.findOneWithError({
            where: { id: dto.documentTemplateId },
            queryRunner,
        });
        const validation = approval_rule_validator_1.ApprovalRuleValidator.validateComplete(dto.stepType, dto.assigneeRule, {
            targetEmployeeId: dto.targetEmployeeId,
            targetDepartmentId: dto.targetDepartmentId,
            targetPositionId: dto.targetPositionId,
        });
        if (!validation.isValid) {
            throw new common_1.BadRequestException(validation.errors.join(', '));
        }
        const approvalStepTemplate = await this.approvalStepTemplateService.createApprovalStepTemplate({
            documentTemplateId: dto.documentTemplateId,
            stepOrder: dto.stepOrder,
            stepType: dto.stepType,
            assigneeRule: dto.assigneeRule,
            targetEmployeeId: dto.targetEmployeeId,
            targetDepartmentId: dto.targetDepartmentId,
            targetPositionId: dto.targetPositionId,
        }, queryRunner);
        this.logger.log(`결재단계 템플릿 생성 완료: ${approvalStepTemplate.id}`);
        return approvalStepTemplate;
    }
    async updateApprovalStepTemplate(stepId, dto, queryRunner) {
        this.logger.log(`결재단계 템플릿 수정 시작: ${stepId}`);
        const step = await this.approvalStepTemplateService.findOneWithError({
            where: { id: stepId },
            queryRunner,
        });
        const stepType = dto.stepType || step.stepType;
        const assigneeRule = dto.assigneeRule || step.assigneeRule;
        const targetEmployeeId = dto.targetEmployeeId !== undefined ? dto.targetEmployeeId : step.targetEmployeeId;
        const targetDepartmentId = dto.targetDepartmentId !== undefined ? dto.targetDepartmentId : step.targetDepartmentId;
        const targetPositionId = dto.targetPositionId !== undefined ? dto.targetPositionId : step.targetPositionId;
        const validation = approval_rule_validator_1.ApprovalRuleValidator.validateComplete(stepType, assigneeRule, {
            targetEmployeeId: targetEmployeeId || undefined,
            targetDepartmentId: targetDepartmentId || undefined,
            targetPositionId: targetPositionId || undefined,
        });
        if (!validation.isValid) {
            throw new common_1.BadRequestException(validation.errors.join(', '));
        }
        const updatedStep = await this.approvalStepTemplateService.updateApprovalStepTemplate(step, {
            stepOrder: dto.stepOrder,
            stepType: dto.stepType,
            assigneeRule: dto.assigneeRule,
            targetEmployeeId: dto.targetEmployeeId,
            targetDepartmentId: dto.targetDepartmentId,
            targetPositionId: dto.targetPositionId,
        }, queryRunner);
        this.logger.log(`결재단계 템플릿 수정 완료: ${stepId}`);
        return updatedStep;
    }
    async deleteApprovalStepTemplate(stepId, queryRunner) {
        this.logger.log(`결재단계 템플릿 삭제 시작: ${stepId}`);
        await this.approvalStepTemplateService.findOneWithError({
            where: { id: stepId },
            queryRunner,
        });
        await this.approvalStepTemplateService.delete(stepId, { queryRunner });
        this.logger.log(`결재단계 템플릿 삭제 완료: ${stepId}`);
    }
    async createCategory(dto, queryRunner) {
        this.logger.log(`카테고리 생성 시작: ${dto.name}`);
        const existing = await this.categoryService.findOne({
            where: { code: dto.code },
            queryRunner,
        });
        if (existing) {
            throw new common_1.BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
        }
        const category = await this.categoryService.createCategory({
            name: dto.name,
            code: dto.code,
            description: dto.description,
            order: dto.order || 0,
        }, queryRunner);
        this.logger.log(`카테고리 생성 완료: ${category.id}`);
        return category;
    }
    async updateCategory(categoryId, dto, queryRunner) {
        this.logger.log(`카테고리 수정 시작: ${categoryId}`);
        const category = await this.categoryService.findOneWithError({
            where: { id: categoryId },
            queryRunner,
        });
        if (dto.code && dto.code !== category.code) {
            const existing = await this.categoryService.findOne({
                where: { code: dto.code },
                queryRunner,
            });
            if (existing) {
                throw new common_1.BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
            }
        }
        const updatedCategory = await this.categoryService.updateCategory(category, {
            name: dto.name,
            code: dto.code,
            description: dto.description,
            order: dto.order,
        }, queryRunner);
        this.logger.log(`카테고리 수정 완료: ${categoryId}`);
        return updatedCategory;
    }
    async deleteCategory(categoryId, queryRunner) {
        this.logger.log(`카테고리 삭제 시작: ${categoryId}`);
        const category = await this.categoryService.findOneWithError({
            where: { id: categoryId },
            relations: ['documentTemplates'],
            queryRunner,
        });
        if (category.documentTemplates && category.documentTemplates.length > 0) {
            throw new common_1.BadRequestException(`카테고리에 속한 문서 템플릿이 ${category.documentTemplates.length}개 있어 삭제할 수 없습니다.`);
        }
        await this.categoryService.delete(categoryId, { queryRunner });
        this.logger.log(`카테고리 삭제 완료: ${categoryId}`);
    }
};
exports.TemplateContext = TemplateContext;
exports.TemplateContext = TemplateContext = TemplateContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_template_service_1.DomainDocumentTemplateService,
        approval_step_template_service_1.DomainApprovalStepTemplateService,
        category_service_1.DomainCategoryService])
], TemplateContext);
//# sourceMappingURL=template.context.js.map