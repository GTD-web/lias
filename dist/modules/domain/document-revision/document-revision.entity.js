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
exports.DocumentRevision = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("../document/document.entity");
const employee_entity_1 = require("../employee/employee.entity");
let DocumentRevision = class DocumentRevision {
};
exports.DocumentRevision = DocumentRevision;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '수정 이력 ID' }),
    __metadata("design:type", String)
], DocumentRevision.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '문서 ID' }),
    __metadata("design:type", String)
], DocumentRevision.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '수정 버전 번호 (1부터 시작)' }),
    __metadata("design:type", Number)
], DocumentRevision.prototype, "revisionNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        comment: '수정 시점의 문서 스냅샷 (Document 엔티티 전체 정보)',
    }),
    __metadata("design:type", Object)
], DocumentRevision.prototype, "documentSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '수정 시점의 결재선 스냅샷 (ApprovalStepSnapshot 엔티티 배열)',
    }),
    __metadata("design:type", Array)
], DocumentRevision.prototype, "approvalStepsSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '수정 사유/코멘트' }),
    __metadata("design:type", String)
], DocumentRevision.prototype, "revisionComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '수정한 사람 ID' }),
    __metadata("design:type", String)
], DocumentRevision.prototype, "revisedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '수정 생성일' }),
    __metadata("design:type", Date)
], DocumentRevision.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], DocumentRevision.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'revisedById' }),
    __metadata("design:type", employee_entity_1.Employee)
], DocumentRevision.prototype, "revisedBy", void 0);
exports.DocumentRevision = DocumentRevision = __decorate([
    (0, typeorm_1.Entity)('document_revisions'),
    (0, typeorm_1.Index)(['documentId', 'revisionNumber']),
    (0, typeorm_1.Index)(['documentId', 'createdAt']),
    (0, typeorm_1.Index)(['revisedById'])
], DocumentRevision);
//# sourceMappingURL=document-revision.entity.js.map