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
let DomainApprovalStepSnapshotService = class DomainApprovalStepSnapshotService extends base_service_1.BaseService {
    constructor(approvalStepSnapshotRepository) {
        super(approvalStepSnapshotRepository);
        this.approvalStepSnapshotRepository = approvalStepSnapshotRepository;
    }
    async findByStepSnapshotId(id) {
        const stepSnapshot = await this.approvalStepSnapshotRepository.findOne({
            where: { id },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
        });
        if (!stepSnapshot) {
            throw new common_1.NotFoundException('결재 단계 스냅샷을 찾을 수 없습니다.');
        }
        return stepSnapshot;
    }
    async findBySnapshotId(snapshotId) {
        return this.approvalStepSnapshotRepository.findBySnapshotId(snapshotId);
    }
    async findByApproverId(approverId) {
        return this.approvalStepSnapshotRepository.findByApproverId(approverId);
    }
    async findByApproverIdAndStatus(approverId, status) {
        return this.approvalStepSnapshotRepository.findByApproverIdAndStatus(approverId, status);
    }
};
exports.DomainApprovalStepSnapshotService = DomainApprovalStepSnapshotService;
exports.DomainApprovalStepSnapshotService = DomainApprovalStepSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_snapshot_repository_1.DomainApprovalStepSnapshotRepository])
], DomainApprovalStepSnapshotService);
//# sourceMappingURL=approval-step-snapshot.service.js.map