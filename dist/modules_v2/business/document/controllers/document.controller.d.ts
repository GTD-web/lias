import { CreateDocumentRequestDto, UpdateDocumentRequestDto, SubmitDocumentRequestDto, DocumentResponseDto } from '../dtos';
import { CreateDocumentUsecase, UpdateDocumentUsecase, SubmitDocumentUsecase, CancelDocumentUsecase, GetDocumentUsecase } from '../usecases';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class DocumentController {
    private readonly createDocumentUsecase;
    private readonly updateDocumentUsecase;
    private readonly submitDocumentUsecase;
    private readonly cancelDocumentUsecase;
    private readonly getDocumentUsecase;
    constructor(createDocumentUsecase: CreateDocumentUsecase, updateDocumentUsecase: UpdateDocumentUsecase, submitDocumentUsecase: SubmitDocumentUsecase, cancelDocumentUsecase: CancelDocumentUsecase, getDocumentUsecase: GetDocumentUsecase);
    createDocument(user: Employee, dto: CreateDocumentRequestDto): Promise<DocumentResponseDto>;
    updateDocument(user: Employee, documentId: string, dto: UpdateDocumentRequestDto): Promise<DocumentResponseDto>;
    submitDocument(user: Employee, documentId: string, dto: SubmitDocumentRequestDto): Promise<DocumentResponseDto>;
    getMyDocuments(user: Employee): Promise<DocumentResponseDto[]>;
    getDocumentsByStatus(status: string): Promise<DocumentResponseDto[]>;
    getDocument(documentId: string): Promise<DocumentResponseDto>;
    deleteDocument(user: Employee, documentId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
