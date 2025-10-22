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
var CreateApprovalLineTemplateUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApprovalLineTemplateUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let CreateApprovalLineTemplateUsecase = CreateApprovalLineTemplateUsecase_1 = class CreateApprovalLineTemplateUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(CreateApprovalLineTemplateUsecase_1.name);
    }
    async execute(createdBy, dto) {
        this.logger.log(`새 결재선 템플릿 생성 요청 (생성자: ${createdBy}): ${dto.name}`);
        const result = await this.approvalFlowContext.createApprovalLineTemplate({
            name: dto.name,
            description: dto.description,
            type: dto.type,
            orgScope: dto.orgScope,
            departmentId: dto.departmentId,
            steps: dto.steps,
            createdBy,
        });
        this.logger.log(`새 결재선 템플릿 생성 완료: ${result.template.id}`);
        return {
            id: result.template.id,
            name: result.template.name,
            description: result.template.description,
            type: result.template.type,
            orgScope: result.template.orgScope,
            departmentId: result.template.departmentId,
            status: result.template.status,
            currentVersionId: result.template.currentVersionId,
            createdAt: result.template.createdAt,
            updatedAt: result.template.updatedAt,
        };
    }
};
exports.CreateApprovalLineTemplateUsecase = CreateApprovalLineTemplateUsecase;
exports.CreateApprovalLineTemplateUsecase = CreateApprovalLineTemplateUsecase = CreateApprovalLineTemplateUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], CreateApprovalLineTemplateUsecase);
//# sourceMappingURL=create-approval-line-template.usecase.js.map