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
exports.ApprovalLineSnapshot = void 0;
const typeorm_1 = require("typeorm");
const approval_line_template_version_entity_1 = require("../approval-line-template/approval-line-template-version.entity");
const approval_step_snapshot_entity_1 = require("../approval-step-snapshot/approval-step-snapshot.entity");
let ApprovalLineSnapshot = class ApprovalLineSnapshot {
};
exports.ApprovalLineSnapshot = ApprovalLineSnapshot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '결재선 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalLineSnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '문서 ID' }),
    __metadata("design:type", String)
], ApprovalLineSnapshot.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '원본 결재선 템플릿 버전 ID' }),
    __metadata("design:type", String)
], ApprovalLineSnapshot.prototype, "sourceTemplateVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, comment: '스냅샷 생성 시점의 결재선 이름' }),
    __metadata("design:type", String)
], ApprovalLineSnapshot.prototype, "snapshotName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '스냅샷 생성 시점의 결재선 설명' }),
    __metadata("design:type", String)
], ApprovalLineSnapshot.prototype, "snapshotDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '스냅샷 메타데이터 (추가 정보)' }),
    __metadata("design:type", Object)
], ApprovalLineSnapshot.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', comment: '스냅샷 생성(동결) 시점' }),
    __metadata("design:type", Date)
], ApprovalLineSnapshot.prototype, "frozenAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], ApprovalLineSnapshot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_line_template_version_entity_1.ApprovalLineTemplateVersion, (version) => version.snapshots, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sourceTemplateVersionId' }),
    __metadata("design:type", approval_line_template_version_entity_1.ApprovalLineTemplateVersion)
], ApprovalLineSnapshot.prototype, "sourceTemplateVersion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_snapshot_entity_1.ApprovalStepSnapshot, (step) => step.snapshot),
    __metadata("design:type", Array)
], ApprovalLineSnapshot.prototype, "steps", void 0);
exports.ApprovalLineSnapshot = ApprovalLineSnapshot = __decorate([
    (0, typeorm_1.Entity)('approval_line_snapshots'),
    (0, typeorm_1.Index)(['documentId'], { unique: true }),
    (0, typeorm_1.Index)(['sourceTemplateVersionId'])
], ApprovalLineSnapshot);
//# sourceMappingURL=approval-line-snapshot.entity.js.map