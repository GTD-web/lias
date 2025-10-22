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
exports.DomainApprovalLineSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const approval_line_snapshot_repository_1 = require("./approval-line-snapshot.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainApprovalLineSnapshotService = class DomainApprovalLineSnapshotService extends base_service_1.BaseService {
    constructor(approvalLineSnapshotRepository) {
        super(approvalLineSnapshotRepository);
        this.approvalLineSnapshotRepository = approvalLineSnapshotRepository;
    }
    async findBySnapshotId(id) {
        const snapshot = await this.approvalLineSnapshotRepository.findOne({
            where: { id },
            relations: ['steps', 'steps.approver'],
        });
        if (!snapshot) {
            throw new common_1.NotFoundException('결재선 스냅샷을 찾을 수 없습니다.');
        }
        return snapshot;
    }
    async findByDocumentId(documentId) {
        const snapshot = await this.approvalLineSnapshotRepository.findByDocumentId(documentId);
        if (!snapshot) {
            throw new common_1.NotFoundException('결재선 스냅샷을 찾을 수 없습니다.');
        }
        return snapshot;
    }
    async findBySourceTemplateVersionId(sourceTemplateVersionId) {
        return this.approvalLineSnapshotRepository.findBySourceTemplateVersionId(sourceTemplateVersionId);
    }
};
exports.DomainApprovalLineSnapshotService = DomainApprovalLineSnapshotService;
exports.DomainApprovalLineSnapshotService = DomainApprovalLineSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_line_snapshot_repository_1.DomainApprovalLineSnapshotRepository])
], DomainApprovalLineSnapshotService);
//# sourceMappingURL=approval-line-snapshot.service.js.map