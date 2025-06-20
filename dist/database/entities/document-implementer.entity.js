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
exports.DocumentImplementer = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const document_entity_1 = require("./document.entity");
let DocumentImplementer = class DocumentImplementer {
};
exports.DocumentImplementer = DocumentImplementer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentImplementer.prototype, "documentImplementerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], DocumentImplementer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급' }),
    __metadata("design:type", String)
], DocumentImplementer.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '정렬 순서',
    }),
    __metadata("design:type", Number)
], DocumentImplementer.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '시행 일자' }),
    __metadata("design:type", Date)
], DocumentImplementer.prototype, "implementDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '시행자' }),
    __metadata("design:type", String)
], DocumentImplementer.prototype, "implementerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.implementDocuments),
    (0, typeorm_1.JoinColumn)({ name: 'implementerId' }),
    __metadata("design:type", employee_entity_1.Employee)
], DocumentImplementer.prototype, "implementer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '문서 ID' }),
    __metadata("design:type", String)
], DocumentImplementer.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (document) => document.implementers),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], DocumentImplementer.prototype, "document", void 0);
exports.DocumentImplementer = DocumentImplementer = __decorate([
    (0, typeorm_1.Entity)('document_implementers')
], DocumentImplementer);
//# sourceMappingURL=document-implementer.entity.js.map