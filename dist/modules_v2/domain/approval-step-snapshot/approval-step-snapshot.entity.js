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
exports.ApprovalStepSnapshot = void 0;
const typeorm_1 = require("typeorm");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const approval_line_snapshot_entity_1 = require("../approval-line-snapshot/approval-line-snapshot.entity");
const employee_entity_1 = require("../employee/employee.entity");
const department_entity_1 = require("../department/department.entity");
const position_entity_1 = require("../position/position.entity");
let ApprovalStepSnapshot = class ApprovalStepSnapshot {
};
exports.ApprovalStepSnapshot = ApprovalStepSnapshot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '결재 단계 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '결재선 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "snapshotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '결재 단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepSnapshot.prototype, "stepOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.ApprovalStepType,
        comment: '결재 단계 타입',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "stepType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, comment: 'Assignee Rule (스냅샷 시점)' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "assigneeRule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '결재자 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "approverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '결재자 부서 ID (스냅샷 시점)' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "approverDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '결재자 직책 ID (스냅샷 시점)' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "approverPositionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.ApprovalStatus,
        default: approval_enum_1.ApprovalStatus.PENDING,
        comment: '결재 상태',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '결재 의견' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '결재 완료 시간' }),
    __metadata("design:type", Date)
], ApprovalStepSnapshot.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, comment: '필수 결재 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepSnapshot.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '결재 단계 설명' }),
    __metadata("design:type", String)
], ApprovalStepSnapshot.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], ApprovalStepSnapshot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], ApprovalStepSnapshot.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_line_snapshot_entity_1.ApprovalLineSnapshot, (snapshot) => snapshot.steps, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'snapshotId' }),
    __metadata("design:type", approval_line_snapshot_entity_1.ApprovalLineSnapshot)
], ApprovalStepSnapshot.prototype, "snapshot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'approverId' }),
    __metadata("design:type", employee_entity_1.Employee)
], ApprovalStepSnapshot.prototype, "approver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approverDepartmentId' }),
    __metadata("design:type", department_entity_1.Department)
], ApprovalStepSnapshot.prototype, "approverDepartment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approverPositionId' }),
    __metadata("design:type", position_entity_1.Position)
], ApprovalStepSnapshot.prototype, "approverPosition", void 0);
exports.ApprovalStepSnapshot = ApprovalStepSnapshot = __decorate([
    (0, typeorm_1.Entity)('approval_step_snapshots'),
    (0, typeorm_1.Index)(['snapshotId', 'stepOrder']),
    (0, typeorm_1.Index)(['approverId']),
    (0, typeorm_1.Index)(['status'])
], ApprovalStepSnapshot);
//# sourceMappingURL=approval-step-snapshot.entity.js.map