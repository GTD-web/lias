"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainApprovalStepSnapshotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const approval_step_snapshot_service_1 = require("./approval-step-snapshot.service");
const approval_step_snapshot_repository_1 = require("./approval-step-snapshot.repository");
const approval_step_snapshot_entity_1 = require("./approval-step-snapshot.entity");
let DomainApprovalStepSnapshotModule = class DomainApprovalStepSnapshotModule {
};
exports.DomainApprovalStepSnapshotModule = DomainApprovalStepSnapshotModule;
exports.DomainApprovalStepSnapshotModule = DomainApprovalStepSnapshotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([approval_step_snapshot_entity_1.ApprovalStepSnapshot])],
        providers: [approval_step_snapshot_service_1.DomainApprovalStepSnapshotService, approval_step_snapshot_repository_1.DomainApprovalStepSnapshotRepository],
        exports: [approval_step_snapshot_service_1.DomainApprovalStepSnapshotService],
    })
], DomainApprovalStepSnapshotModule);
//# sourceMappingURL=approval-step-snapshot.module.js.map