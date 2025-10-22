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
exports.ApprovalLineTemplateVersion = void 0;
const typeorm_1 = require("typeorm");
const approval_line_template_entity_1 = require("./approval-line-template.entity");
const approval_step_template_entity_1 = require("../approval-step-template/approval-step-template.entity");
const form_version_approval_line_template_version_entity_1 = require("../form-version-approval-line-template-version/form-version-approval-line-template-version.entity");
const approval_line_snapshot_entity_1 = require("../approval-line-snapshot/approval-line-snapshot.entity");
let ApprovalLineTemplateVersion = class ApprovalLineTemplateVersion {
};
exports.ApprovalLineTemplateVersion = ApprovalLineTemplateVersion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '결재선 템플릿 버전 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '결재선 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersion.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '버전 번호 (1부터 시작)' }),
    __metadata("design:type", Number)
], ApprovalLineTemplateVersion.prototype, "versionNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, comment: '현재 활성 버전 여부' }),
    __metadata("design:type", Boolean)
], ApprovalLineTemplateVersion.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '버전 변경 사유' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersion.prototype, "changeReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '작성자 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersion.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], ApprovalLineTemplateVersion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], ApprovalLineTemplateVersion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_line_template_entity_1.ApprovalLineTemplate, (template) => template.versions),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", approval_line_template_entity_1.ApprovalLineTemplate)
], ApprovalLineTemplateVersion.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_template_entity_1.ApprovalStepTemplate, (step) => step.lineTemplateVersion),
    __metadata("design:type", Array)
], ApprovalLineTemplateVersion.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_version_approval_line_template_version_entity_1.FormVersionApprovalLineTemplateVersion, (mapping) => mapping.approvalLineTemplateVersion),
    __metadata("design:type", Array)
], ApprovalLineTemplateVersion.prototype, "formVersionMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_line_snapshot_entity_1.ApprovalLineSnapshot, (snapshot) => snapshot.sourceTemplateVersion),
    __metadata("design:type", Array)
], ApprovalLineTemplateVersion.prototype, "snapshots", void 0);
exports.ApprovalLineTemplateVersion = ApprovalLineTemplateVersion = __decorate([
    (0, typeorm_1.Entity)('approval_line_template_versions'),
    (0, typeorm_1.Index)(['templateId', 'versionNo'], { unique: true }),
    (0, typeorm_1.Index)(['templateId', 'isActive'])
], ApprovalLineTemplateVersion);
//# sourceMappingURL=approval-line-template-version.entity.js.map