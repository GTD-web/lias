import { Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { CreateDocumentRequestDto, DocumentResponseDto } from '../dtos';

/**
 * 문서 생성 유스케이스
 */
@Injectable()
export class CreateDocumentUsecase {
    private readonly logger = new Logger(CreateDocumentUsecase.name);

    constructor(private readonly documentContext: DocumentContext) {}

    async execute(drafterId: string, dto: CreateDocumentRequestDto): Promise<DocumentResponseDto> {
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
}
