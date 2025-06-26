import { ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
export declare class GetDraftUseCase {
    private readonly domainDocumentService;
    constructor(domainDocumentService: DomainDocumentService);
    execute(id: string): Promise<ApprovalResponseDto>;
}
