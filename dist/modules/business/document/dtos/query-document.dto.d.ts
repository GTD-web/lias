import { DocumentStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';
export declare class QueryDocumentsDto {
    status?: DocumentStatus;
    pendingStepType?: ApprovalStepType;
    drafterId?: string;
    referenceUserId?: string;
    categoryId?: string;
    searchKeyword?: string;
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}
