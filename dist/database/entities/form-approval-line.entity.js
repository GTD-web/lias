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
exports.FormApprovalLine = void 0;
const typeorm_1 = require("typeorm");
const document_form_entity_1 = require("./document-form.entity");
const form_approval_step_entity_1 = require("./form-approval-step.entity");
let FormApprovalLine = class FormApprovalLine {
};
exports.FormApprovalLine = FormApprovalLine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FormApprovalLine.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 이름' }),
    __metadata("design:type", String)
], FormApprovalLine.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 설명' }),
    __metadata("design:type", String)
], FormApprovalLine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalLine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalLine.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FormApprovalLine.prototype, "documentFormId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_form_entity_1.DocumentForm, (documentForm) => documentForm.formApprovalLines),
    (0, typeorm_1.JoinColumn)({ name: 'documentFormId' }),
    __metadata("design:type", document_form_entity_1.DocumentForm)
], FormApprovalLine.prototype, "documentForm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_approval_step_entity_1.FormApprovalStep, (formApprovalStep) => formApprovalStep.formApprovalLine),
    __metadata("design:type", Array)
], FormApprovalLine.prototype, "formApprovalSteps", void 0);
exports.FormApprovalLine = FormApprovalLine = __decorate([
    (0, typeorm_1.Entity)('form-approval-lines')
], FormApprovalLine);
//# sourceMappingURL=form-approval-line.entity.js.map