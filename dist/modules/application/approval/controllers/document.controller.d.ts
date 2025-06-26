import { ApprovalService } from '../approval.service';
import { CreateDraftDocumentDto, UpdateDraftDocumentDto, ApprovalResponseDto } from '../dtos';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { Employee } from 'src/database/entities/employee.entity';
export declare class ApprovalDraftController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    createDraft(user: Employee, draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto>;
    getDraftList(user: Employee, query: PaginationQueryDto, status: ApprovalStatus | ApprovalStatus[], stepType: ApprovalStepType | ApprovalStepType[]): Promise<PaginationData<ApprovalResponseDto>>;
    getDraft(id: string): Promise<ApprovalResponseDto>;
    updateDraft(id: string, draftData: UpdateDraftDocumentDto): Promise<ApprovalResponseDto>;
    deleteDraft(id: string): Promise<void>;
}
