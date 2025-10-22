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
var UpdateFormVersionUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFormVersionUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let UpdateFormVersionUsecase = UpdateFormVersionUsecase_1 = class UpdateFormVersionUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(UpdateFormVersionUsecase_1.name);
    }
    async execute(createdBy, dto) {
        this.logger.log(`문서양식 수정 요청 (수정자: ${createdBy}): ${dto.formId}`);
        const result = await this.approvalFlowContext.updateFormVersion({
            formId: dto.formId,
            versionNote: dto.versionNote,
            template: dto.template,
            lineTemplateVersionId: dto.lineTemplateVersionId,
            cloneAndEdit: dto.cloneAndEdit,
            baseLineTemplateVersionId: dto.baseLineTemplateVersionId,
            stepEdits: dto.stepEdits,
            createdBy,
        });
        this.logger.log(`문서양식 수정 완료: ${result.form.id}, 새 버전: v${result.newVersion.versionNo}`);
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
            newVersion: {
                id: result.newVersion.id,
                formId: result.newVersion.formId,
                versionNo: result.newVersion.versionNo,
                isActive: result.newVersion.isActive,
                changeReason: result.newVersion.changeReason,
                createdAt: result.newVersion.createdAt,
            },
        };
    }
};
exports.UpdateFormVersionUsecase = UpdateFormVersionUsecase;
exports.UpdateFormVersionUsecase = UpdateFormVersionUsecase = UpdateFormVersionUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], UpdateFormVersionUsecase);
//# sourceMappingURL=update-form-version.usecase.js.map