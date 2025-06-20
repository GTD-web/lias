import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';
export declare class FindDocumentFormsUseCase {
    private readonly documentFormService;
    constructor(documentFormService: DomainDocumentFormService);
    execute(): Promise<DocumentFormResponseDto[]>;
}
