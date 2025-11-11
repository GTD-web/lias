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
exports.ApprovalStepTemplate = void 0;
const typeorm_1 = require("typeorm");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const document_template_entity_1 = require("../document-template/document-template.entity");
const employee_entity_1 = require("../employee/employee.entity");
const department_entity_1 = require("../department/department.entity");
const position_entity_1 = require("../position/position.entity");
let ApprovalStepTemplate = class ApprovalStepTemplate {
};
exports.ApprovalStepTemplate = ApprovalStepTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '결재 단계 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '문서 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "documentTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '결재 단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepTemplate.prototype, "stepOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.ApprovalStepType,
        comment: '결재 단계 타입',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "stepType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.AssigneeRule,
        default: approval_enum_1.AssigneeRule.FIXED,
        comment: '결재자 할당 규칙',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "assigneeRule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '결재자 ID ' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "targetEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '부서 ID' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "targetDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '직책 ID' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "targetPositionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_template_entity_1.DocumentTemplate, (documentTemplate) => documentTemplate.approvalStepTemplates, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'documentTemplateId' }),
    __metadata("design:type", document_template_entity_1.DocumentTemplate)
], ApprovalStepTemplate.prototype, "documentTemplate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'targetEmployeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], ApprovalStepTemplate.prototype, "targetEmployee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'targetDepartmentId' }),
    __metadata("design:type", department_entity_1.Department)
], ApprovalStepTemplate.prototype, "targetDepartment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'targetPositionId' }),
    __metadata("design:type", position_entity_1.Position)
], ApprovalStepTemplate.prototype, "targetPosition", void 0);
exports.ApprovalStepTemplate = ApprovalStepTemplate = __decorate([
    (0, typeorm_1.Entity)('approval_step_templates'),
    (0, typeorm_1.Index)(['documentTemplateId', 'stepOrder'])
], ApprovalStepTemplate);
//# sourceMappingURL=approval-step-template.entity.js.map