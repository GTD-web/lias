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
var UpdateDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
let UpdateDocumentUsecase = UpdateDocumentUsecase_1 = class UpdateDocumentUsecase {
    constructor(documentContext) {
        this.documentContext = documentContext;
        this.logger = new common_1.Logger(UpdateDocumentUsecase_1.name);
    }
    async execute(userId, documentId, dto) {
        this.logger.log(`문서 수정 요청: ${documentId} by user: ${userId}`);
        const existingDocument = await this.documentContext.getDocument(documentId);
        if (existingDocument.drafterId !== userId) {
            throw new common_1.ForbiddenException('본인이 작성한 문서만 수정할 수 있습니다');
        }
        const document = await this.documentContext.updateDocument(documentId, {
            title: dto.title,
            content: dto.content,
            metadata: dto.metadata,
        });
        this.logger.log(`문서 수정 완료: ${document.id}`);
        return {
            id: document.id,
            formId: document.formVersion?.formId || '',
            formVersionId: document.formVersionId,
            title: document.title,
            drafterId: document.drafterId,
            drafterDepartmentId: undefined,
            status: document.status,
            content: document.content,
            metadata: document.metadata,
            documentNumber: document.documentNumber,
            approvalLineSnapshotId: document.approvalLineSnapshotId,
            submittedAt: document.submittedAt,
            cancelReason: document.cancelReason,
            cancelledAt: document.cancelledAt,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
};
exports.UpdateDocumentUsecase = UpdateDocumentUsecase;
exports.UpdateDocumentUsecase = UpdateDocumentUsecase = UpdateDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext])
], UpdateDocumentUsecase);
//# sourceMappingURL=update-document.usecase.js.map