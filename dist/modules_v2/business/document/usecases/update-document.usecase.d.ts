import { DocumentContext } from '../../../context/document/document.context';
import { UpdateDocumentRequestDto, DocumentResponseDto } from '../dtos';
export declare class UpdateDocumentUsecase {
    private readonly documentContext;
    private readonly logger;
    constructor(documentContext: DocumentContext);
    execute(userId: string, documentId: string, dto: UpdateDocumentRequestDto): Promise<DocumentResponseDto>;
}
