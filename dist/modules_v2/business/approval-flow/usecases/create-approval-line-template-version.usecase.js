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
var CreateApprovalLineTemplateVersionUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApprovalLineTemplateVersionUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let CreateApprovalLineTemplateVersionUsecase = CreateApprovalLineTemplateVersionUsecase_1 = class CreateApprovalLineTemplateVersionUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(CreateApprovalLineTemplateVersionUsecase_1.name);
    }
    async execute(createdBy, dto) {
        this.logger.log(`결재선 템플릿 새 버전 생성 요청 (생성자: ${createdBy}): ${dto.templateId}`);
        const result = await this.approvalFlowContext.createApprovalLineTemplateVersion({
            templateId: dto.templateId,
            versionNote: dto.versionNote,
            steps: dto.steps,
            createdBy,
        });
        this.logger.log(`결재선 템플릿 새 버전 생성 완료: v${result.versionNo}`);
        return {
            id: result.id,
            templateId: result.templateId,
            versionNo: result.versionNo,
            isActive: result.isActive,
            changeReason: result.changeReason,
            createdAt: result.createdAt,
        };
    }
};
exports.CreateApprovalLineTemplateVersionUsecase = CreateApprovalLineTemplateVersionUsecase;
exports.CreateApprovalLineTemplateVersionUsecase = CreateApprovalLineTemplateVersionUsecase = CreateApprovalLineTemplateVersionUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], CreateApprovalLineTemplateVersionUsecase);
//# sourceMappingURL=create-approval-line-template-version.usecase.js.map