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
var RejectStepUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectStepUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
let RejectStepUsecase = RejectStepUsecase_1 = class RejectStepUsecase {
    constructor(approvalProcessContext) {
        this.approvalProcessContext = approvalProcessContext;
        this.logger = new common_1.Logger(RejectStepUsecase_1.name);
    }
    async execute(approverId, dto) {
        this.logger.log(`결재 반려 요청 (결재자: ${approverId}): ${dto.stepSnapshotId}`);
        const rejectedStep = await this.approvalProcessContext.rejectStep({
            stepSnapshotId: dto.stepSnapshotId,
            approverId,
            comment: dto.comment,
        });
        this.logger.log(`결재 반려 완료: ${rejectedStep.id}`);
        return rejectedStep;
    }
};
exports.RejectStepUsecase = RejectStepUsecase;
exports.RejectStepUsecase = RejectStepUsecase = RejectStepUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext])
], RejectStepUsecase);
//# sourceMappingURL=reject-step.usecase.js.map