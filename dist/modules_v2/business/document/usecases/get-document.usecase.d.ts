import { DocumentContext } from '../../../context/document/document.context';
import { DocumentStatus } from '../../../../common/enums/approval.enum';
import { DocumentResponseDto } from '../dtos/document-response.dto';
export declare class GetDocumentUsecase {
    private readonly documentContext;
    private readonly logger;
    constructor(documentContext: DocumentContext);
    getById(documentId: string): Promise<DocumentResponseDto>;
    getByDrafter(drafterId: string): Promise<DocumentResponseDto[]>;
    getByStatus(status: DocumentStatus): Promise<DocumentResponseDto[]>;
    private mapToResponseDtos;
}
