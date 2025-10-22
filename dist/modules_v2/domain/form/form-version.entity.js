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
exports.FormVersion = void 0;
const typeorm_1 = require("typeorm");
const form_entity_1 = require("./form.entity");
const form_version_approval_line_template_version_entity_1 = require("../form-version-approval-line-template-version/form-version-approval-line-template-version.entity");
const document_entity_1 = require("../document/document.entity");
let FormVersion = class FormVersion {
};
exports.FormVersion = FormVersion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '양식 버전 ID' }),
    __metadata("design:type", String)
], FormVersion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '문서 양식 ID' }),
    __metadata("design:type", String)
], FormVersion.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '버전 번호 (1부터 시작)' }),
    __metadata("design:type", Number)
], FormVersion.prototype, "versionNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 양식 HTML 템플릿' }),
    __metadata("design:type", String)
], FormVersion.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, comment: '현재 활성 버전 여부' }),
    __metadata("design:type", Boolean)
], FormVersion.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '버전 변경 사유' }),
    __metadata("design:type", String)
], FormVersion.prototype, "changeReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '작성자 ID' }),
    __metadata("design:type", String)
], FormVersion.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], FormVersion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], FormVersion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_entity_1.Form, (form) => form.versions),
    (0, typeorm_1.JoinColumn)({ name: 'formId' }),
    __metadata("design:type", form_entity_1.Form)
], FormVersion.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_version_approval_line_template_version_entity_1.FormVersionApprovalLineTemplateVersion, (mapping) => mapping.formVersion),
    __metadata("design:type", Array)
], FormVersion.prototype, "approvalLineTemplateMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.formVersion),
    __metadata("design:type", Array)
], FormVersion.prototype, "documents", void 0);
exports.FormVersion = FormVersion = __decorate([
    (0, typeorm_1.Entity)('form_versions'),
    (0, typeorm_1.Index)(['formId', 'versionNo'], { unique: true }),
    (0, typeorm_1.Index)(['formId', 'isActive'])
], FormVersion);
//# sourceMappingURL=form-version.entity.js.map