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
exports.FormVersionApprovalLineTemplateVersion = void 0;
const typeorm_1 = require("typeorm");
const form_version_entity_1 = require("../form/form-version.entity");
const approval_line_template_version_entity_1 = require("../approval-line-template/approval-line-template-version.entity");
let FormVersionApprovalLineTemplateVersion = class FormVersionApprovalLineTemplateVersion {
};
exports.FormVersionApprovalLineTemplateVersion = FormVersionApprovalLineTemplateVersion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '매핑 ID' }),
    __metadata("design:type", String)
], FormVersionApprovalLineTemplateVersion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '양식 버전 ID' }),
    __metadata("design:type", String)
], FormVersionApprovalLineTemplateVersion.prototype, "formVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '결재선 템플릿 버전 ID' }),
    __metadata("design:type", String)
], FormVersionApprovalLineTemplateVersion.prototype, "approvalLineTemplateVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, comment: '기본 결재선 여부' }),
    __metadata("design:type", Boolean)
], FormVersionApprovalLineTemplateVersion.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, comment: '표시 순서' }),
    __metadata("design:type", Number)
], FormVersionApprovalLineTemplateVersion.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], FormVersionApprovalLineTemplateVersion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_version_entity_1.FormVersion, (version) => version.approvalLineTemplateMappings, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'formVersionId' }),
    __metadata("design:type", form_version_entity_1.FormVersion)
], FormVersionApprovalLineTemplateVersion.prototype, "formVersion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_line_template_version_entity_1.ApprovalLineTemplateVersion, (version) => version.formVersionMappings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'approvalLineTemplateVersionId' }),
    __metadata("design:type", approval_line_template_version_entity_1.ApprovalLineTemplateVersion)
], FormVersionApprovalLineTemplateVersion.prototype, "approvalLineTemplateVersion", void 0);
exports.FormVersionApprovalLineTemplateVersion = FormVersionApprovalLineTemplateVersion = __decorate([
    (0, typeorm_1.Entity)('form_version_approval_line_template_versions'),
    (0, typeorm_1.Index)(['formVersionId', 'approvalLineTemplateVersionId'], { unique: true }),
    (0, typeorm_1.Index)(['formVersionId', 'isDefault'])
], FormVersionApprovalLineTemplateVersion);
//# sourceMappingURL=form-version-approval-line-template-version.entity.js.map