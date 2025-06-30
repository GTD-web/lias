import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { Document } from 'src/database/entities';
export declare class ApproveDocumentUseCase {
    private readonly documentService;
    constructor(documentService: DomainDocumentService);
    execute(id: string): Promise<Document>;
}
