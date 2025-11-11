import { CreateExternalDocumentRequestDto, DocumentResponseDto } from '../dtos';
import { CreateExternalDocumentUsecase } from '../usecases';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class ExternalDocumentController {
    private readonly createExternalDocumentUsecase;
    constructor(createExternalDocumentUsecase: CreateExternalDocumentUsecase);
    createExternalDocument(user: Employee, dto: CreateExternalDocumentRequestDto): Promise<DocumentResponseDto>;
}
