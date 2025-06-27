import { ApprovalService } from '../approval.service';
import { CreateDraftDocumentDto, ApprovalResponseDto } from '../dtos';
import { Employee } from 'src/database/entities/employee.entity';
export declare class ApprovalDraftController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    createDraft(user: Employee, draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto>;
}
