import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { UpdateDocumentTypeDto, DocumentTypeResponseDto } from '../../dtos/form-type.dto';
export declare class UpdateFormTypeUseCase {
    private readonly documentTypeService;
    constructor(documentTypeService: DomainDocumentTypeService);
    execute(documentTypeId: string, dto: UpdateDocumentTypeDto): Promise<DocumentTypeResponseDto>;
}
