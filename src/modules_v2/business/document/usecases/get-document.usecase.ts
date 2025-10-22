import { Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { DocumentStatus } from '../../../../common/enums/approval.enum';
import { DocumentResponseDto } from '../dtos/document-response.dto';

/**
 * 문서 조회 유스케이스
 */
@Injectable()
export class GetDocumentUsecase {
    private readonly logger = new Logger(GetDocumentUsecase.name);

    constructor(private readonly documentContext: DocumentContext) {}

    /**
     * ID로 문서 조회
     */
    async getById(documentId: string): Promise<DocumentResponseDto> {
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

    /**
     * 기안자별 문서 조회
     */
    async getByDrafter(drafterId: string): Promise<DocumentResponseDto[]> {
        this.logger.log(`기안자별 문서 조회: ${drafterId}`);
        const documents = await this.documentContext.getDocuments({ drafterId });
        return this.mapToResponseDtos(documents);
    }

    /**
     * 상태별 문서 조회
     */
    async getByStatus(status: DocumentStatus): Promise<DocumentResponseDto[]> {
        this.logger.log(`상태별 문서 조회: ${status}`);
        const documents = await this.documentContext.getDocuments({ status });
        return this.mapToResponseDtos(documents);
    }

    /**
     * Document 엔티티 배열을 DocumentResponseDto 배열로 변환
     */
    private mapToResponseDtos(documents: any[]): DocumentResponseDto[] {
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
}
