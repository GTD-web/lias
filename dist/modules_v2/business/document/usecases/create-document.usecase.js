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
var CreateDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
let CreateDocumentUsecase = CreateDocumentUsecase_1 = class CreateDocumentUsecase {
    constructor(documentContext) {
        this.documentContext = documentContext;
        this.logger = new common_1.Logger(CreateDocumentUsecase_1.name);
    }
    async execute(drafterId, dto) {
        this.logger.log(`문서 생성 요청 (기안자: ${drafterId}): ${dto.title}`);
        const document = await this.documentContext.createDocument({
            formVersionId: dto.formVersionId,
            title: dto.title,
            drafterId,
            content: dto.content,
            metadata: dto.metadata,
        });
        this.logger.log(`문서 생성 완료: ${document.id}`);
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
exports.CreateDocumentUsecase = CreateDocumentUsecase;
exports.CreateDocumentUsecase = CreateDocumentUsecase = CreateDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext])
], CreateDocumentUsecase);
//# sourceMappingURL=create-document.usecase.js.map