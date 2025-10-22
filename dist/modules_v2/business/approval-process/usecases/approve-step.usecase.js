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
var ApproveStepUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveStepUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
let ApproveStepUsecase = ApproveStepUsecase_1 = class ApproveStepUsecase {
    constructor(approvalProcessContext) {
        this.approvalProcessContext = approvalProcessContext;
        this.logger = new common_1.Logger(ApproveStepUsecase_1.name);
    }
    async execute(approverId, dto) {
        this.logger.log(`결재 승인 요청 (결재자: ${approverId}): ${dto.stepSnapshotId}`);
        const approvedStep = await this.approvalProcessContext.approveStep({
            stepSnapshotId: dto.stepSnapshotId,
            approverId,
            comment: dto.comment,
        });
        this.logger.log(`결재 승인 완료: ${approvedStep.id}`);
        return approvedStep;
    }
};
exports.ApproveStepUsecase = ApproveStepUsecase;
exports.ApproveStepUsecase = ApproveStepUsecase = ApproveStepUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext])
], ApproveStepUsecase);
//# sourceMappingURL=approve-step.usecase.js.map