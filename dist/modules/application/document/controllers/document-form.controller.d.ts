import { DocumentService } from '../document.service';
import { CreateDocumentFormDto, DocumentFormResponseDto, UpdateDocumentFormDto } from '../dtos/document-form.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { Employee } from 'src/database/entities/employee.entity';
export declare class DocumentFormController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocumentForm(createDocumentFormDto: CreateDocumentFormDto): Promise<DocumentFormResponseDto>;
    findAllDocumentForms(query: PaginationQueryDto): Promise<PaginationData<DocumentFormResponseDto>>;
    findDocumentFormById(user: Employee, id: string): Promise<DocumentFormResponseDto>;
    updateDocumentFormById(id: string, updateDocumentFormDto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto>;
    deleteDocumentFormById(id: string): Promise<boolean>;
}
