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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainApprovalStepSnapshotRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const approval_step_snapshot_entity_1 = require("./approval-step-snapshot.entity");
const base_repository_1 = require("../../../common/repositories/base.repository");
let DomainApprovalStepSnapshotRepository = class DomainApprovalStepSnapshotRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
    async findBySnapshotId(snapshotId) {
        return this.repository.find({
            where: { snapshotId },
            order: { stepOrder: 'ASC' },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
        });
    }
    async findByApproverId(approverId) {
        return this.repository.find({
            where: { approverId },
            order: { createdAt: 'DESC' },
            relations: ['snapshot'],
        });
    }
    async findByApproverIdAndStatus(approverId, status) {
        return this.repository.find({
            where: { approverId, status },
            order: { createdAt: 'DESC' },
            relations: ['snapshot'],
        });
    }
};
exports.DomainApprovalStepSnapshotRepository = DomainApprovalStepSnapshotRepository;
exports.DomainApprovalStepSnapshotRepository = DomainApprovalStepSnapshotRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(approval_step_snapshot_entity_1.ApprovalStepSnapshot)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DomainApprovalStepSnapshotRepository);
//# sourceMappingURL=approval-step-snapshot.repository.js.map