import { DocumentService } from '../document.service';
import { CreateDocumentTypeDto, DocumentTypeResponseDto, UpdateDocumentTypeDto } from '../dtos/form-type.dto';
export declare class FormTypeController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createFormType(createDocumentTypeDto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto>;
    findAllFormTypes(): Promise<DocumentTypeResponseDto[]>;
    findFormTypeById(id: string): Promise<DocumentTypeResponseDto>;
    updateFormTypeById(id: string, updateDocumentTypeDto: UpdateDocumentTypeDto): Promise<DocumentTypeResponseDto>;
    deleteFormTypeById(id: string): Promise<boolean>;
}
