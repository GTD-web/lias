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
const form_approval_line_entity_1 = require("./form-approval-line.entity");
const employee_entity_1 = require("./employee.entity");
let ApprovalStepTemplate = class ApprovalStepTemplate {
};
exports.ApprovalStepTemplate = ApprovalStepTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "approvalStepTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등)' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 이름' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 설명' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepTemplate.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재자 지정 방식 (ex. Enum(USER, DEPARTMENT_POSITION, POSITION, TITLE))' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "approverType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재자 지정 값 (ex.  userId, positionCode, titleCode)' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "approverValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'DEPARTMENT_POSITION인 경우 부서 범위 타입  (ex. Enum(SELECTED, DRAFT_OWNER, NONE))' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "departmentScopeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', comment: '결재 단계 조건 표현식' }),
    __metadata("design:type", Object)
], ApprovalStepTemplate.prototype, "conditionExpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 병렬 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepTemplate.prototype, "isParallel", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 단계 필수 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepTemplate.prototype, "isMandatory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalStepTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalStepTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '기본 결재자 ID', nullable: true }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "defaultApproverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.defaultApprovers),
    (0, typeorm_1.JoinColumn)({ name: 'defaultApproverId' }),
    __metadata("design:type", employee_entity_1.Employee)
], ApprovalStepTemplate.prototype, "defaultApprover", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalStepTemplate.prototype, "approvalLineTemplateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_approval_line_entity_1.ApprovalLineTemplate, (approvalLineTemplate) => approvalLineTemplate.approvalStepTemplates),
    (0, typeorm_1.JoinColumn)({ name: 'approvalLineTemplateId' }),
    __metadata("design:type", form_approval_line_entity_1.ApprovalLineTemplate)
], ApprovalStepTemplate.prototype, "approvalLineTemplate", void 0);
exports.ApprovalStepTemplate = ApprovalStepTemplate = __decorate([
    (0, typeorm_1.Entity)('approval-step-templates')
], ApprovalStepTemplate);
//# sourceMappingURL=approval-step-template.entity.js.map