import { DataSource } from 'typeorm';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
export declare class DeleteDraftUseCase {
    private readonly dataSource;
    private readonly domainDocumentService;
    private readonly domainApprovalStepService;
    private readonly domainFileService;
    constructor(dataSource: DataSource, domainDocumentService: DomainDocumentService, domainApprovalStepService: DomainApprovalStepService, domainFileService: DomainFileService);
    execute(id: string): Promise<void>;
}
