import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';

/**
 * 문서 삭제 유스케이스
 */
@Injectable()
export class CancelDocumentUsecase {
    private readonly logger = new Logger(CancelDocumentUsecase.name);

    constructor(private readonly documentContext: DocumentContext) {}

    async execute(userId: string, documentId: string) {
        this.logger.log(`문서 삭제 요청: ${documentId} by user: ${userId}`);

        // 문서 조회 및 권한 확인
        const existingDocument = await this.documentContext.getDocument(documentId);
        if (existingDocument.drafterId !== userId) {
            throw new ForbiddenException('본인이 작성한 문서만 삭제할 수 있습니다');
        }

        await this.documentContext.deleteDocument(documentId);

        this.logger.log(`문서 삭제 완료: ${documentId}`);
        return { success: true, message: '문서가 삭제되었습니다.' };
    }
}
