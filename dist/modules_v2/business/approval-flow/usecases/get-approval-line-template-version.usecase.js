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
var GetApprovalLineTemplateVersionUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApprovalLineTemplateVersionUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let GetApprovalLineTemplateVersionUsecase = GetApprovalLineTemplateVersionUsecase_1 = class GetApprovalLineTemplateVersionUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(GetApprovalLineTemplateVersionUsecase_1.name);
    }
    async execute(templateId, versionId) {
        this.logger.debug(`결재선 템플릿 버전 조회 실행: templateId=${templateId}, versionId=${versionId}`);
        const templateVersion = await this.approvalFlowContext.getApprovalLineTemplateVersion(templateId, versionId);
        if (!templateVersion) {
            throw new common_1.NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다: ${versionId}`);
        }
        const steps = await this.approvalFlowContext.getApprovalStepTemplatesWithDetails(versionId);
        return {
            ...templateVersion,
            steps,
        };
    }
};
exports.GetApprovalLineTemplateVersionUsecase = GetApprovalLineTemplateVersionUsecase;
exports.GetApprovalLineTemplateVersionUsecase = GetApprovalLineTemplateVersionUsecase = GetApprovalLineTemplateVersionUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], GetApprovalLineTemplateVersionUsecase);
//# sourceMappingURL=get-approval-line-template-version.usecase.js.map