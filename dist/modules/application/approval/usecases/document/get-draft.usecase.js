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
exports.GetDraftUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("../../../../domain/document/document.service");
let GetDraftUseCase = class GetDraftUseCase {
    constructor(domainDocumentService) {
        this.domainDocumentService = domainDocumentService;
    }
    async execute(id) {
        const document = await this.domainDocumentService.findOne({
            where: {
                documentId: id,
            },
            relations: ['drafter', 'approvalSteps', 'parentDocument', 'files'],
        });
        return document;
    }
};
exports.GetDraftUseCase = GetDraftUseCase;
exports.GetDraftUseCase = GetDraftUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_service_1.DomainDocumentService])
], GetDraftUseCase);
//# sourceMappingURL=get-draft.usecase.js.map