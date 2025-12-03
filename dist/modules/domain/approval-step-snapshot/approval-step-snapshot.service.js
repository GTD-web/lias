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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainApprovalStepSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const approval_step_snapshot_repository_1 = require("./approval-step-snapshot.repository");
const base_service_1 = require("../../../common/services/base.service");
const approval_step_snapshot_entity_1 = require("./approval-step-snapshot.entity");
let DomainApprovalStepSnapshotService = class DomainApprovalStepSnapshotService extends base_service_1.BaseService {
    constructor(approvalStepSnapshotRepository) {
        super(approvalStepSnapshotRepository);
        this.approvalStepSnapshotRepository = approvalStepSnapshotRepository;
    }
    async createApprovalStepSnapshot(dto, queryRunner) {
        const snapshot = new approval_step_snapshot_entity_1.ApprovalStepSnapshot();
        if (dto.documentId) {
            snapshot.문서를설정한다(dto.documentId);
        }
        if (dto.stepOrder !== undefined) {
            snapshot.결재단계순서를설정한다(dto.stepOrder);
        }
        if (dto.stepType) {
            snapshot.결재단계타입을설정한다(dto.stepType);
        }
        if (dto.approverId) {
            snapshot.결재자를설정한다(dto.approverId);
        }
        if (dto.approverSnapshot) {
            snapshot.결재자스냅샷을설정한다(dto.approverSnapshot);
        }
        if (dto.comment) {
            snapshot.의견을설정한다(dto.comment);
        }
        snapshot.대기한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
    async updateApprovalStepSnapshot(snapshot, dto, queryRunner) {
        if (dto.stepOrder !== undefined) {
            snapshot.결재단계순서를설정한다(dto.stepOrder);
        }
        if (dto.stepType) {
            snapshot.결재단계타입을설정한다(dto.stepType);
        }
        if (dto.approverId) {
            snapshot.결재자를설정한다(dto.approverId);
        }
        if (dto.approverSnapshot) {
            snapshot.결재자스냅샷을설정한다(dto.approverSnapshot);
        }
        if (dto.comment) {
            snapshot.의견을설정한다(dto.comment);
        }
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
    async approveApprovalStepSnapshot(snapshot, queryRunner) {
        snapshot.승인한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
    async rejectApprovalStepSnapshot(snapshot, queryRunner) {
        snapshot.반려한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
    async cancelApprovalStepSnapshot(snapshot, queryRunner) {
        snapshot.취소한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
};
exports.DomainApprovalStepSnapshotService = DomainApprovalStepSnapshotService;
exports.DomainApprovalStepSnapshotService = DomainApprovalStepSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_snapshot_repository_1.DomainApprovalStepSnapshotRepository])
], DomainApprovalStepSnapshotService);
//# sourceMappingURL=approval-step-snapshot.service.js.map