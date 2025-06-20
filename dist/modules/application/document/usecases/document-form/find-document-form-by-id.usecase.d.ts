import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';
export declare class FindDocumentFormByIdUseCase {
    private readonly documentFormService;
    constructor(documentFormService: DomainDocumentFormService);
    execute(documentFormId: string): Promise<DocumentFormResponseDto>;
}
