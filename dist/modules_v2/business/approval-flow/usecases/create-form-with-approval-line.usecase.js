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
var CreateFormWithApprovalLineUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFormWithApprovalLineUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let CreateFormWithApprovalLineUsecase = CreateFormWithApprovalLineUsecase_1 = class CreateFormWithApprovalLineUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(CreateFormWithApprovalLineUsecase_1.name);
    }
    async execute(createdBy, dto) {
        this.logger.log(`문서양식 생성 요청 (생성자: ${createdBy}): ${dto.formName}`);
        const result = await this.approvalFlowContext.createFormWithApprovalLine({
            formName: dto.formName,
            formCode: dto.formCode,
            description: dto.description,
            useExistingLine: dto.useExistingLine,
            lineTemplateVersionId: dto.lineTemplateVersionId,
            baseLineTemplateVersionId: dto.baseLineTemplateVersionId,
            stepEdits: dto.stepEdits,
            createdBy,
        });
        this.logger.log(`문서양식 생성 완료: ${result.form.id}`);
        return {
            form: {
                id: result.form.id,
                name: result.form.name,
                code: result.form.code,
                description: result.form.description,
                status: result.form.status,
                currentVersionId: result.form.currentVersionId,
                createdAt: result.form.createdAt,
                updatedAt: result.form.updatedAt,
            },
            formVersion: {
                id: result.formVersion.id,
                formId: result.formVersion.formId,
                versionNo: result.formVersion.versionNo,
                isActive: result.formVersion.isActive,
                changeReason: result.formVersion.changeReason,
                createdAt: result.formVersion.createdAt,
            },
            lineTemplateVersionId: result.lineTemplateVersionId,
        };
    }
};
exports.CreateFormWithApprovalLineUsecase = CreateFormWithApprovalLineUsecase;
exports.CreateFormWithApprovalLineUsecase = CreateFormWithApprovalLineUsecase = CreateFormWithApprovalLineUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], CreateFormWithApprovalLineUsecase);
//# sourceMappingURL=create-form-with-approval-line.usecase.js.map