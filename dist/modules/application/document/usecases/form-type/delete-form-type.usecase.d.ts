import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
export declare class DeleteFormTypeUseCase {
    private readonly documentTypeService;
    constructor(documentTypeService: DomainDocumentTypeService);
    execute(documentTypeId: string): Promise<boolean>;
}
