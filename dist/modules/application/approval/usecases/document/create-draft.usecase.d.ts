import { DataSource } from 'typeorm';
import { ApprovalResponseDto, CreateDraftDocumentDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
import { Employee } from 'src/database/entities/employee.entity';
export declare class CreateDraftUseCase {
    private readonly dataSource;
    private readonly domainDocumentService;
    private readonly domainApprovalStepService;
    private readonly domainFileService;
    constructor(dataSource: DataSource, domainDocumentService: DomainDocumentService, domainApprovalStepService: DomainApprovalStepService, domainFileService: DomainFileService);
    execute(user: Employee, draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto>;
}
