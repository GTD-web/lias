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
exports.DomainDocumentTemplateService = void 0;
const common_1 = require("@nestjs/common");
const document_template_repository_1 = require("./document-template.repository");
const base_service_1 = require("../../../common/services/base.service");
const document_template_entity_1 = require("./document-template.entity");
let DomainDocumentTemplateService = class DomainDocumentTemplateService extends base_service_1.BaseService {
    constructor(documentTemplateRepository) {
        super(documentTemplateRepository);
        this.documentTemplateRepository = documentTemplateRepository;
    }
    async createDocumentTemplate(params, queryRunner) {
        const documentTemplate = new document_template_entity_1.DocumentTemplate();
        documentTemplate.이름을설정한다(params.name);
        documentTemplate.코드를설정한다(params.code);
        documentTemplate.템플릿을설정한다(params.template);
        if (params.description) {
            documentTemplate.설명을설정한다(params.description);
        }
        if (params.categoryId) {
            documentTemplate.카테고리를설정한다(params.categoryId);
        }
        if (params.status) {
            documentTemplate.상태를설정한다(params.status);
        }
        return await this.documentTemplateRepository.save(documentTemplate, { queryRunner });
    }
    async updateDocumentTemplate(documentTemplate, params, queryRunner) {
        if (params.name) {
            documentTemplate.이름을설정한다(params.name);
        }
        if (params.code) {
            documentTemplate.코드를설정한다(params.code);
        }
        if (params.description !== undefined) {
            documentTemplate.설명을설정한다(params.description);
        }
        if (params.template) {
            documentTemplate.템플릿을설정한다(params.template);
        }
        if (params.categoryId !== undefined) {
            documentTemplate.카테고리를설정한다(params.categoryId);
        }
        if (params.status) {
            documentTemplate.상태를설정한다(params.status);
        }
        return await this.documentTemplateRepository.save(documentTemplate, { queryRunner });
    }
};
exports.DomainDocumentTemplateService = DomainDocumentTemplateService;
exports.DomainDocumentTemplateService = DomainDocumentTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_template_repository_1.DomainDocumentTemplateRepository])
], DomainDocumentTemplateService);
//# sourceMappingURL=document-template.service.js.map