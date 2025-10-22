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
var CreateApprovalSnapshotUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApprovalSnapshotUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let CreateApprovalSnapshotUsecase = CreateApprovalSnapshotUsecase_1 = class CreateApprovalSnapshotUsecase {
    constructor(approvalFlowContext) {
        this.approvalFlowContext = approvalFlowContext;
        this.logger = new common_1.Logger(CreateApprovalSnapshotUsecase_1.name);
    }
    async execute(dto) {
        this.logger.log(`결재 스냅샷 생성 요청: Document ${dto.documentId}`);
        const result = await this.approvalFlowContext.createApprovalSnapshot({
            documentId: dto.documentId,
            formVersionId: dto.formVersionId,
            draftContext: dto.draftContext,
        });
        this.logger.log(`결재 스냅샷 생성 완료: ${result.id}`);
        return {
            id: result.id,
            documentId: result.documentId,
            frozenAt: result.frozenAt,
        };
    }
};
exports.CreateApprovalSnapshotUsecase = CreateApprovalSnapshotUsecase;
exports.CreateApprovalSnapshotUsecase = CreateApprovalSnapshotUsecase = CreateApprovalSnapshotUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_flow_context_1.ApprovalFlowContext])
], CreateApprovalSnapshotUsecase);
//# sourceMappingURL=create-approval-snapshot.usecase.js.map