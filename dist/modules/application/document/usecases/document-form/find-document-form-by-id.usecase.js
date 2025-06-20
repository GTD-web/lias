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
exports.FindDocumentFormByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_form_service_1 = require("../../../../domain/document-form/document-form.service");
let FindDocumentFormByIdUseCase = class FindDocumentFormByIdUseCase {
    constructor(documentFormService) {
        this.documentFormService = documentFormService;
    }
    async execute(documentFormId) {
        const documentForm = await this.documentFormService.findOne({
            where: { documentFormId },
            relations: ['documentType', 'formApprovalLine', 'formApprovalLine.formApprovalSteps'],
        });
        if (!documentForm) {
            throw new common_1.NotFoundException('문서 양식을 찾을 수 없습니다.');
        }
        return documentForm;
    }
};
exports.FindDocumentFormByIdUseCase = FindDocumentFormByIdUseCase;
exports.FindDocumentFormByIdUseCase = FindDocumentFormByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_form_service_1.DomainDocumentFormService])
], FindDocumentFormByIdUseCase);
//# sourceMappingURL=find-document-form-by-id.usecase.js.map