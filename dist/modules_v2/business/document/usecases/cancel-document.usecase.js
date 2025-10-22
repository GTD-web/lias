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
var CancelDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
let CancelDocumentUsecase = CancelDocumentUsecase_1 = class CancelDocumentUsecase {
    constructor(documentContext) {
        this.documentContext = documentContext;
        this.logger = new common_1.Logger(CancelDocumentUsecase_1.name);
    }
    async execute(userId, documentId) {
        this.logger.log(`문서 삭제 요청: ${documentId} by user: ${userId}`);
        const existingDocument = await this.documentContext.getDocument(documentId);
        if (existingDocument.drafterId !== userId) {
            throw new common_1.ForbiddenException('본인이 작성한 문서만 삭제할 수 있습니다');
        }
        await this.documentContext.deleteDocument(documentId);
        this.logger.log(`문서 삭제 완료: ${documentId}`);
        return { success: true, message: '문서가 삭제되었습니다.' };
    }
};
exports.CancelDocumentUsecase = CancelDocumentUsecase;
exports.CancelDocumentUsecase = CancelDocumentUsecase = CancelDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext])
], CancelDocumentUsecase);
//# sourceMappingURL=cancel-document.usecase.js.map