"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDocumentTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_template_service_1 = require("./document-template.service");
const document_template_repository_1 = require("./document-template.repository");
const document_template_entity_1 = require("./document-template.entity");
let DomainDocumentTemplateModule = class DomainDocumentTemplateModule {
};
exports.DomainDocumentTemplateModule = DomainDocumentTemplateModule;
exports.DomainDocumentTemplateModule = DomainDocumentTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([document_template_entity_1.DocumentTemplate])],
        providers: [document_template_service_1.DomainDocumentTemplateService, document_template_repository_1.DomainDocumentTemplateRepository],
        exports: [document_template_service_1.DomainDocumentTemplateService],
    })
], DomainDocumentTemplateModule);
//# sourceMappingURL=document-template.module.js.map