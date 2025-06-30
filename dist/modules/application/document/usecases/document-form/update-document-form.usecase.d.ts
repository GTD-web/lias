import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { UpdateDocumentFormDto, DocumentFormResponseDto } from '../../dtos/document-form.dto';
export declare class UpdateDocumentFormUseCase {
    private readonly documentFormService;
    constructor(documentFormService: DomainDocumentFormService);
    execute(documentFormId: string, dto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto>;
}
