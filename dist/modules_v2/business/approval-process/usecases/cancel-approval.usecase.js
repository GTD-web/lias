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
var CancelApprovalUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelApprovalUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
let CancelApprovalUsecase = CancelApprovalUsecase_1 = class CancelApprovalUsecase {
    constructor(approvalProcessContext) {
        this.approvalProcessContext = approvalProcessContext;
        this.logger = new common_1.Logger(CancelApprovalUsecase_1.name);
    }
    async execute(drafterId, dto) {
        this.logger.log(`결재 취소 요청 (기안자: ${drafterId}): ${dto.documentId}`);
        const cancelledDocument = await this.approvalProcessContext.cancelApproval({
            documentId: dto.documentId,
            drafterId,
            reason: dto.reason,
        });
        this.logger.log(`결재 취소 완료: ${cancelledDocument.id}`);
        return cancelledDocument;
    }
};
exports.CancelApprovalUsecase = CancelApprovalUsecase;
exports.CancelApprovalUsecase = CancelApprovalUsecase = CancelApprovalUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext])
], CancelApprovalUsecase);
//# sourceMappingURL=cancel-approval.usecase.js.map