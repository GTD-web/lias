import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { DocumentTypeResponseDto } from '../../dtos/form-type.dto';
export declare class FindFormTypeByIdUseCase {
    private readonly documentTypeService;
    constructor(documentTypeService: DomainDocumentTypeService);
    execute(documentTypeId: string): Promise<DocumentTypeResponseDto>;
}
