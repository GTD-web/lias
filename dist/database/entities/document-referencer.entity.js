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
exports.DocumentReferencer = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const document_entity_1 = require("./document.entity");
let DocumentReferencer = class DocumentReferencer {
};
exports.DocumentReferencer = DocumentReferencer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentReferencer.prototype, "documentReferencerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], DocumentReferencer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급' }),
    __metadata("design:type", String)
], DocumentReferencer.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '정렬 순서',
    }),
    __metadata("design:type", Number)
], DocumentReferencer.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '참조자' }),
    __metadata("design:type", String)
], DocumentReferencer.prototype, "referencerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.referencedDocuments),
    (0, typeorm_1.JoinColumn)({ name: 'referencerId' }),
    __metadata("design:type", employee_entity_1.Employee)
], DocumentReferencer.prototype, "referencer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '문서 ID' }),
    __metadata("design:type", String)
], DocumentReferencer.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (document) => document.referencers),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], DocumentReferencer.prototype, "document", void 0);
exports.DocumentReferencer = DocumentReferencer = __decorate([
    (0, typeorm_1.Entity)('document_referencers')
], DocumentReferencer);
//# sourceMappingURL=document-referencer.entity.js.map