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
const approval_enum_1 = require("../../../common/enums/approval.enum");
let ApprovalLineTemplate = class ApprovalLineTemplate {
};
exports.ApprovalLineTemplate = ApprovalLineTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '결재선 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재선 이름' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '결재선 설명' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.ApprovalLineType,
        comment: '결재선 타입 (공통/개인)',
    }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.DepartmentScopeType,
        default: approval_enum_1.DepartmentScopeType.ALL,
        comment: '조직 범위 (ALL: 전사 공통, SPECIFIC_DEPARTMENT: 특정 부서 전용)',
    }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "orgScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '부서 ID (SPECIFIC_DEPARTMENT인 경우 필수)' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.ApprovalLineTemplateStatus,
        default: approval_enum_1.ApprovalLineTemplateStatus.DRAFT,
        comment: '결재선 템플릿 상태',
    }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '현재 활성 버전 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "currentVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '작성자 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplate.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], ApprovalLineTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], ApprovalLineTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('ApprovalLineTemplateVersion'),
    (0, typeorm_1.JoinColumn)({ name: 'currentVersionId' }),
    __metadata("design:type", Object)
], ApprovalLineTemplate.prototype, "currentVersion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ApprovalLineTemplateVersion', 'template'),
    __metadata("design:type", Array)
], ApprovalLineTemplate.prototype, "versions", void 0);
exports.ApprovalLineTemplate = ApprovalLineTemplate = __decorate([
    (0, typeorm_1.Entity)('approval_line_templates'),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['type'])
], ApprovalLineTemplate);
//# sourceMappingURL=approval-line-template.entity.js.map