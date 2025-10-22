import { DocumentContext } from '../../../context/document/document.context';
import { CreateDocumentRequestDto, DocumentResponseDto } from '../dtos';
export declare class CreateDocumentUsecase {
    private readonly documentContext;
    private readonly logger;
    constructor(documentContext: DocumentContext);
    execute(drafterId: string, dto: CreateDocumentRequestDto): Promise<DocumentResponseDto>;
}
