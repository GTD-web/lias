import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
export declare class DeleteDocumentFormUseCase {
    private readonly documentFormService;
    constructor(documentFormService: DomainDocumentFormService);
    execute(documentFormId: string): Promise<boolean>;
}
