import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { DocumentTypeResponseDto } from '../../dtos/form-type.dto';
export declare class FindFormTypesUseCase {
    private readonly documentTypeService;
    constructor(documentTypeService: DomainDocumentTypeService);
    execute(): Promise<DocumentTypeResponseDto[]>;
}
