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
exports.FormApprovalStep = void 0;
const typeorm_1 = require("typeorm");
const form_approval_line_entity_1 = require("./form-approval-line.entity");
const employee_entity_1 = require("./employee.entity");
const approval_enum_1 = require("../../common/enums/approval.enum");
let FormApprovalStep = class FormApprovalStep {
};
exports.FormApprovalStep = FormApprovalStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FormApprovalStep.prototype, "formApprovalStepId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: approval_enum_1.ApprovalStepType, comment: '결재 단계 타입 (ex. 합의, 결재)' }),
    __metadata("design:type", String)
], FormApprovalStep.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 순서' }),
    __metadata("design:type", Number)
], FormApprovalStep.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalStep.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalStep.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '기본 결재자 ID', nullable: true }),
    __metadata("design:type", String)
], FormApprovalStep.prototype, "defaultApproverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.defaultApprovers),
    (0, typeorm_1.JoinColumn)({ name: 'defaultApproverId' }),
    __metadata("design:type", employee_entity_1.Employee)
], FormApprovalStep.prototype, "defaultApprover", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 템플릿 ID' }),
    __metadata("design:type", String)
], FormApprovalStep.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_approval_line_entity_1.FormApprovalLine, (formApprovalLine) => formApprovalLine.formApprovalSteps),
    (0, typeorm_1.JoinColumn)({ name: 'formApprovalLineId' }),
    __metadata("design:type", form_approval_line_entity_1.FormApprovalLine)
], FormApprovalStep.prototype, "formApprovalLine", void 0);
exports.FormApprovalStep = FormApprovalStep = __decorate([
    (0, typeorm_1.Entity)('form_approval_steps')
], FormApprovalStep);
//# sourceMappingURL=form-approval-step.entity.js.map