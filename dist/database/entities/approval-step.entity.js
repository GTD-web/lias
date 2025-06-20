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
exports.ApprovalStep = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const document_entity_1 = require("./document.entity");
const approval_enum_1 = require("../../common/enums/approval.enum");
let ApprovalStep = class ApprovalStep {
};
exports.ApprovalStep = ApprovalStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalStep.prototype, "approvalStepId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: approval_enum_1.ApprovalStepType, comment: '결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등)' }),
    __metadata("design:type", String)
], ApprovalStep.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStep.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', comment: '결재 일시', nullable: true }),
    __metadata("design:type", Date)
], ApprovalStep.prototype, "approvedDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalStep.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalStep.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '기본 결재자 ID', nullable: true }),
    __metadata("design:type", String)
], ApprovalStep.prototype, "approverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.approvers),
    (0, typeorm_1.JoinColumn)({ name: 'approverId' }),
    __metadata("design:type", employee_entity_1.Employee)
], ApprovalStep.prototype, "approver", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 ID' }),
    __metadata("design:type", String)
], ApprovalStep.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (document) => document.approvalSteps),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], ApprovalStep.prototype, "document", void 0);
exports.ApprovalStep = ApprovalStep = __decorate([
    (0, typeorm_1.Entity)('approval_steps')
], ApprovalStep);
//# sourceMappingURL=approval-step.entity.js.map