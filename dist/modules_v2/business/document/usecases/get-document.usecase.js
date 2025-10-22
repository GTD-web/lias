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
var GetDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
let GetDocumentUsecase = GetDocumentUsecase_1 = class GetDocumentUsecase {
    constructor(documentContext) {
        this.documentContext = documentContext;
        this.logger = new common_1.Logger(GetDocumentUsecase_1.name);
    }
    async getById(documentId) {
        this.logger.log(`문서 조회: ${documentId}`);
        const document = await this.documentContext.getDocument(documentId);
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
    async getByDrafter(drafterId) {
        this.logger.log(`기안자별 문서 조회: ${drafterId}`);
        const documents = await this.documentContext.getDocuments({ drafterId });
        return this.mapToResponseDtos(documents);
    }
    async getByStatus(status) {
        this.logger.log(`상태별 문서 조회: ${status}`);
        const documents = await this.documentContext.getDocuments({ status });
        return this.mapToResponseDtos(documents);
    }
    mapToResponseDtos(documents) {
        return documents.map((doc) => ({
            id: doc.id,
            formId: doc.formVersion?.formId || '',
            formVersionId: doc.formVersionId,
            title: doc.title,
            drafterId: doc.drafterId,
            drafterDepartmentId: undefined,
            status: doc.status,
            content: doc.content,
            metadata: doc.metadata,
            documentNumber: doc.documentNumber,
            approvalLineSnapshotId: doc.approvalLineSnapshotId,
            submittedAt: doc.submittedAt,
            cancelReason: doc.cancelReason,
            cancelledAt: doc.cancelledAt,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }));
    }
};
exports.GetDocumentUsecase = GetDocumentUsecase;
exports.GetDocumentUsecase = GetDocumentUsecase = GetDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext])
], GetDocumentUsecase);
//# sourceMappingURL=get-document.usecase.js.map