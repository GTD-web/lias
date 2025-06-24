import { DocumentService } from '../document.service';
import { CreateDocumentFormDto, DocumentFormResponseDto, UpdateDocumentFormDto } from '../dtos/document-form.dto';
import { PaginationQueryDto } from 'src/common/dtos/paginate-query.dto';
import { PaginationData } from 'src/common/dtos/paginate-response.dto';
export declare class DocumentFormController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocumentForm(createDocumentFormDto: CreateDocumentFormDto): Promise<DocumentFormResponseDto>;
    findAllDocumentForms(query: PaginationQueryDto): Promise<PaginationData<DocumentFormResponseDto>>;
    findDocumentFormById(id: string): Promise<DocumentFormResponseDto>;
    updateDocumentFormById(id: string, updateDocumentFormDto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto>;
    deleteDocumentFormById(id: string): Promise<boolean>;
}
