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
exports.Document = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const file_entity_1 = require("./file.entity");
const approval_step_entity_1 = require("./approval-step.entity");
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Document.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '문서(품의) 번호' }),
    __metadata("design:type", String)
], Document.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서(품의) 유형' }),
    __metadata("design:type", String)
], Document.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 제목' }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 내용' }),
    __metadata("design:type", String)
], Document.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 상태' }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '보존 연한 (ex. 10년, 영구보관)' }),
    __metadata("design:type", String)
], Document.prototype, "retentionPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '보존 연한 단위 (ex. 년, 월, 일)' }),
    __metadata("design:type", String)
], Document.prototype, "retentionPeriodUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '보존 연한 시작일' }),
    __metadata("design:type", Date)
], Document.prototype, "retentionStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '보존 연한 종료일' }),
    __metadata("design:type", Date)
], Document.prototype, "retentionEndDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '기안자' }),
    __metadata("design:type", String)
], Document.prototype, "drafterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.documents),
    (0, typeorm_1.JoinColumn)({ name: 'drafterId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Document.prototype, "drafter", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '참조자' }),
    __metadata("design:type", String)
], Document.prototype, "referencerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.documents),
    (0, typeorm_1.JoinColumn)({ name: 'referencerId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Document.prototype, "referencer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '시행자' }),
    __metadata("design:type", String)
], Document.prototype, "implementerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.documents),
    (0, typeorm_1.JoinColumn)({ name: 'implementerId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Document.prototype, "implementer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_entity_1.ApprovalStep, (approvalStep) => approvalStep.document),
    __metadata("design:type", Array)
], Document.prototype, "approvalSteps", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "parentDocumentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document, (document) => document.childDocuments),
    (0, typeorm_1.JoinColumn)({ name: 'parentDocumentId' }),
    __metadata("design:type", Document)
], Document.prototype, "parentDocument", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document, (document) => document.parentDocument),
    __metadata("design:type", Array)
], Document.prototype, "childDocuments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, (file) => file.document),
    __metadata("design:type", Array)
], Document.prototype, "files", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents')
], Document);
//# sourceMappingURL=document-implementer.entity%20copy.js.map