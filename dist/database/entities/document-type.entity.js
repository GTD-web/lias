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
exports.DocumentType = void 0;
const typeorm_1 = require("typeorm");
const document_form_entity_1 = require("./document-form.entity");
let DocumentType = class DocumentType {
};
exports.DocumentType = DocumentType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentType.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 타입 이름' }),
    __metadata("design:type", String)
], DocumentType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 번호 코드 (ex. 휴가, 출결, 출신 등' }),
    __metadata("design:type", String)
], DocumentType.prototype, "documentNumberCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_form_entity_1.DocumentForm, (documentForm) => documentForm.documentType),
    __metadata("design:type", Array)
], DocumentType.prototype, "documentForms", void 0);
exports.DocumentType = DocumentType = __decorate([
    (0, typeorm_1.Entity)('document-types')
], DocumentType);
//# sourceMappingURL=document-type.entity.js.map