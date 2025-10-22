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
var CompleteAgreementUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteAgreementUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
let CompleteAgreementUsecase = CompleteAgreementUsecase_1 = class CompleteAgreementUsecase {
    constructor(approvalProcessContext) {
        this.approvalProcessContext = approvalProcessContext;
        this.logger = new common_1.Logger(CompleteAgreementUsecase_1.name);
    }
    async execute(agreerId, dto) {
        this.logger.log(`협의 완료 요청 (협의자: ${agreerId}): ${dto.stepSnapshotId}`);
        const completedStep = await this.approvalProcessContext.completeAgreement({
            stepSnapshotId: dto.stepSnapshotId,
            agreerId,
            comment: dto.comment,
        });
        this.logger.log(`협의 완료: ${completedStep.id}`);
        return completedStep;
    }
};
exports.CompleteAgreementUsecase = CompleteAgreementUsecase;
exports.CompleteAgreementUsecase = CompleteAgreementUsecase = CompleteAgreementUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext])
], CompleteAgreementUsecase);
//# sourceMappingURL=complete-agreement.usecase.js.map