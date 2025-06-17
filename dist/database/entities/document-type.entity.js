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
exports.DocumentType = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("./document.entity");
const form_approval_line_entity_1 = require("./form-approval-line.entity");
let DocumentType = class DocumentType {
};
exports.DocumentType = DocumentType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentType.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentType.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 양식 html' }),
    __metadata("design:type", String)
], DocumentType.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.documentType),
    __metadata("design:type", Array)
], DocumentType.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_approval_line_entity_1.ApprovalLineTemplate, (approvalLineTemplate) => approvalLineTemplate.documentType),
    __metadata("design:type", Array)
], DocumentType.prototype, "approvalLineTemplates", void 0);
exports.DocumentType = DocumentType = __decorate([
    (0, typeorm_1.Entity)('document-types')
], DocumentType);
//# sourceMappingURL=document-type.entity.js.map