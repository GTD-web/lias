import { DocumentService } from '../document.service';
import { CreateDocumentFormDto, DocumentFormResponseDto, UpdateDocumentFormDto } from '../dtos/document-form.dto';
export declare class DocumentFormController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocumentForm(createDocumentFormDto: CreateDocumentFormDto): Promise<DocumentFormResponseDto>;
    findAllDocumentForms(): Promise<DocumentFormResponseDto[]>;
    findDocumentFormById(id: string): Promise<DocumentFormResponseDto>;
    updateDocumentFormById(id: string, updateDocumentFormDto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto>;
    deleteDocumentFormById(id: string): Promise<boolean>;
}
