import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { UpdateDocumentRequestDto, DocumentResponseDto } from '../dtos';

/**
 * 문서 수정 유스케이스
 */
@Injectable()
export class UpdateDocumentUsecase {
    private readonly logger = new Logger(UpdateDocumentUsecase.name);

    constructor(private readonly documentContext: DocumentContext) {}

    async execute(userId: string, documentId: string, dto: UpdateDocumentRequestDto): Promise<DocumentResponseDto> {
        this.logger.log(`문서 수정 요청: ${documentId} by user: ${userId}`);

        // 문서 조회 및 권한 확인
        const existingDocument = await this.documentContext.getDocument(documentId);
        if (existingDocument.drafterId !== userId) {
            throw new ForbiddenException('본인이 작성한 문서만 수정할 수 있습니다');
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
}
