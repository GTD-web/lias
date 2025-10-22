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
exports.Document = void 0;
const typeorm_1 = require("typeorm");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const form_version_entity_1 = require("../form/form-version.entity");
const approval_line_snapshot_entity_1 = require("../approval-line-snapshot/approval-line-snapshot.entity");
const employee_entity_1 = require("../employee/employee.entity");
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '문서 ID' }),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true, comment: '문서(품의) 번호' }),
    __metadata("design:type", String)
], Document.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '문서 양식 버전 ID' }),
    __metadata("design:type", String)
], Document.prototype, "formVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '결재선 스냅샷 ID' }),
    __metadata("design:type", String)
], Document.prototype, "approvalLineSnapshotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, comment: '문서 제목' }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 내용 (HTML)' }),
    __metadata("design:type", String)
], Document.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.DocumentStatus,
        default: approval_enum_1.DocumentStatus.DRAFT,
        comment: '문서 상태',
    }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '기안자 ID' }),
    __metadata("design:type", String)
], Document.prototype, "drafterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '기안(상신) 일시' }),
    __metadata("design:type", Date)
], Document.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '취소 사유' }),
    __metadata("design:type", String)
], Document.prototype, "cancelReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '취소 일시' }),
    __metadata("design:type", Date)
], Document.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '문서 비고' }),
    __metadata("design:type", String)
], Document.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, comment: '보존 연한 (예: 10년, 영구보관)' }),
    __metadata("design:type", String)
], Document.prototype, "retentionPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, comment: '보존 연한 단위 (예: 년, 월, 일)' }),
    __metadata("design:type", String)
], Document.prototype, "retentionPeriodUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, comment: '보존 연한 시작일' }),
    __metadata("design:type", Date)
], Document.prototype, "retentionStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, comment: '보존 연한 종료일' }),
    __metadata("design:type", Date)
], Document.prototype, "retentionEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, comment: '시행 일자' }),
    __metadata("design:type", Date)
], Document.prototype, "implementDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '결재 완료 일시' }),
    __metadata("design:type", Date)
], Document.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '반려 일시' }),
    __metadata("design:type", Date)
], Document.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '부모 문서 ID (재기안 시)' }),
    __metadata("design:type", String)
], Document.prototype, "parentDocumentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '문서 메타데이터 (추가 정보)' }),
    __metadata("design:type", Object)
], Document.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일 (기안일)' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_version_entity_1.FormVersion, (formVersion) => formVersion.documents, {
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formVersionId' }),
    __metadata("design:type", form_version_entity_1.FormVersion)
], Document.prototype, "formVersion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => approval_line_snapshot_entity_1.ApprovalLineSnapshot, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approvalLineSnapshotId' }),
    __metadata("design:type", approval_line_snapshot_entity_1.ApprovalLineSnapshot)
], Document.prototype, "approvalLineSnapshot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.draftDocuments),
    (0, typeorm_1.JoinColumn)({ name: 'drafterId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Document.prototype, "drafter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document, (document) => document.childDocuments, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentDocumentId' }),
    __metadata("design:type", Document)
], Document.prototype, "parentDocument", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document, (document) => document.parentDocument),
    __metadata("design:type", Array)
], Document.prototype, "childDocuments", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents'),
    (0, typeorm_1.Index)(['formVersionId']),
    (0, typeorm_1.Index)(['drafterId']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['documentNumber'], { unique: true }),
    (0, typeorm_1.Index)(['createdAt'])
], Document);
//# sourceMappingURL=document.entity.js.map