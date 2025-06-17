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
exports.ApprovalLineTemplate = void 0;
const typeorm_1 = require("typeorm");
const document_type_entity_1 = require("./document-type.entity");
const approval_step_template_entity_1 = require("./approval-step-template.entity");
let ApprovalLineTemplate = class ApprovalLineTemplate {
};
exports.ApprovalLineTemplate = ApprovalLineTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "approvalLineTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "approvalLineType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalLineTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalLineTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_type_entity_1.DocumentType, (documentType) => documentType.approvalLineTemplates),
    (0, typeorm_1.JoinColumn)({ name: 'documentTypeId' }),
    __metadata("design:type", document_type_entity_1.DocumentType)
], ApprovalLineTemplate.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_template_entity_1.ApprovalStepTemplate, (approvalStepTemplate) => approvalStepTemplate.approvalLineTemplate),
    __metadata("design:type", Array)
], ApprovalLineTemplate.prototype, "approvalStepTemplates", void 0);
exports.ApprovalLineTemplate = ApprovalLineTemplate = __decorate([
    (0, typeorm_1.Entity)('approval-line-templates')
], ApprovalLineTemplate);
//# sourceMappingURL=approval-line-template.entity.js.map