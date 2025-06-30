import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { CreateDocumentTypeDto, DocumentTypeResponseDto } from '../../dtos/form-type.dto';
export declare class CreateFormTypeUseCase {
    private readonly documentTypeService;
    constructor(documentTypeService: DomainDocumentTypeService);
    execute(dto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto>;
}
