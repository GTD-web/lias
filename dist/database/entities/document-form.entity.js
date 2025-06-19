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
exports.DocumentForm = void 0;
const typeorm_1 = require("typeorm");
const form_approval_line_entity_1 = require("./form-approval-line.entity");
const document_type_entity_1 = require("./document-type.entity");
let DocumentForm = class DocumentForm {
};
exports.DocumentForm = DocumentForm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentForm.prototype, "documentFormId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 양식 이름' }),
    __metadata("design:type", String)
], DocumentForm.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 양식 설명', nullable: true }),
    __metadata("design:type", String)
], DocumentForm.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 양식 html' }),
    __metadata("design:type", String)
], DocumentForm.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', comment: '수신 및 참조자 정보 객체', nullable: true }),
    __metadata("design:type", Array)
], DocumentForm.prototype, "receiverInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', comment: '시행자 정보 객체', nullable: true }),
    __metadata("design:type", Array)
], DocumentForm.prototype, "implementerInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재선 ID' }),
    __metadata("design:type", String)
], DocumentForm.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_approval_line_entity_1.FormApprovalLine, (formApprovalLine) => formApprovalLine.documentForms),
    (0, typeorm_1.JoinColumn)({ name: 'formApprovalLineId' }),
    __metadata("design:type", form_approval_line_entity_1.FormApprovalLine)
], DocumentForm.prototype, "formApprovalLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 양식 타입 ID' }),
    __metadata("design:type", String)
], DocumentForm.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_type_entity_1.DocumentType, (documentType) => documentType.documentForms),
    (0, typeorm_1.JoinColumn)({ name: 'documentTypeId' }),
    __metadata("design:type", document_type_entity_1.DocumentType)
], DocumentForm.prototype, "documentType", void 0);
exports.DocumentForm = DocumentForm = __decorate([
    (0, typeorm_1.Entity)('document-forms')
], DocumentForm);
//# sourceMappingURL=document-form.entity.js.map