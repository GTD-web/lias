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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormApprovalLineCustom = void 0;
const typeorm_1 = require("typeorm");
const form_approval_line_entity_1 = require("./form-approval-line.entity");
const user_entity_1 = require("./user.entity");
let FormApprovalLineCustom = class FormApprovalLineCustom {
};
exports.FormApprovalLineCustom = FormApprovalLineCustom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FormApprovalLineCustom.prototype, "formApprovalLineCustomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 이름' }),
    __metadata("design:type", String)
], FormApprovalLineCustom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 설명', nullable: true }),
    __metadata("design:type", String)
], FormApprovalLineCustom.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 사용 여부', default: true }),
    __metadata("design:type", Boolean)
], FormApprovalLineCustom.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '결재 라인 정렬 순서', default: 0 }),
    __metadata("design:type", Number)
], FormApprovalLineCustom.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalLineCustom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], FormApprovalLineCustom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FormApprovalLineCustom.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FormApprovalLineCustom.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_approval_line_entity_1.FormApprovalLine, (formApprovalLine) => formApprovalLine.customLines),
    (0, typeorm_1.JoinColumn)({ name: 'formApprovalLineId' }),
    __metadata("design:type", form_approval_line_entity_1.FormApprovalLine)
], FormApprovalLineCustom.prototype, "formApprovalLine", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], FormApprovalLineCustom.prototype, "user", void 0);
exports.FormApprovalLineCustom = FormApprovalLineCustom = __decorate([
    (0, typeorm_1.Entity)('form-approval-line-customs')
], FormApprovalLineCustom);
//# sourceMappingURL=form-approval-line-custom.entity.js.map