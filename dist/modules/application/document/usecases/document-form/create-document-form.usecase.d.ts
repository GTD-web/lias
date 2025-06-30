import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { CreateDocumentFormDto, DocumentFormResponseDto } from '../../dtos/document-form.dto';
export declare class CreateDocumentFormUseCase {
    private readonly documentFormService;
    constructor(documentFormService: DomainDocumentFormService);
    execute(dto: CreateDocumentFormDto): Promise<DocumentFormResponseDto>;
}
