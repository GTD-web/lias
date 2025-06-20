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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const role_type_enum_1 = require("../../common/enums/role-type.enum");
const document_entity_1 = require("./document.entity");
const form_approval_step_entity_1 = require("./form-approval-step.entity");
const approval_step_entity_1 = require("./approval-step.entity");
const document_implementer_entity_1 = require("./document-implementer.entity");
const document_referencer_entity_1 = require("./document-referencer.entity");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '사번' }),
    __metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '이메일' }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '부서' }),
    __metadata("design:type", String)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '직책' }),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '직급' }),
    __metadata("design:type", String)
], Employee.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '액세스 토큰' }),
    __metadata("design:type", String)
], Employee.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '토큰 만료 시간', type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Employee.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_type_enum_1.Role, array: true, default: [role_type_enum_1.Role.USER], comment: '사용자 역할' }),
    __metadata("design:type", Array)
], Employee.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.drafter),
    __metadata("design:type", Array)
], Employee.prototype, "draftDocuments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_approval_step_entity_1.FormApprovalStep, (formApprovalStep) => formApprovalStep.defaultApprover),
    __metadata("design:type", Array)
], Employee.prototype, "defaultApprovers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_entity_1.ApprovalStep, (approvalStep) => approvalStep.approver),
    __metadata("design:type", Array)
], Employee.prototype, "approvers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_implementer_entity_1.DocumentImplementer, (documentImplementer) => documentImplementer.implementer),
    __metadata("design:type", Array)
], Employee.prototype, "implementDocuments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_referencer_entity_1.DocumentReferencer, (documentReferencer) => documentReferencer.referencer),
    __metadata("design:type", Array)
], Employee.prototype, "referencedDocuments", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map