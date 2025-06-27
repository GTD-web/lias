import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
export declare class CreateApprovalStepDto {
    type: ApprovalStepType;
    order: number;
    approverId: string;
}
export declare class FileDto {
    fileId: string;
    fileName: string;
    filePath: string;
    createdAt: Date;
}
export declare class CreateDraftDocumentDto {
    documentNumber: string;
    documentType: string;
    title: string;
    content: string;
    drafterId: string;
    approvalSteps: CreateApprovalStepDto[];
    parentDocumentId?: string;
    files: FileDto[];
}
export declare class UpdateDraftDocumentDto extends CreateDraftDocumentDto {
}
export declare class EmployeeResponseDto {
    employeeId: string;
    name: string;
    employeeNumber: string;
    email: string;
    department: string;
    position: string;
    rank: string;
}
export declare class ApprovalStepResponseDto {
    type: ApprovalStepType;
    order: number;
    isApproved: boolean;
    approvedDate: Date;
    isCurrent: boolean;
    createdAt: Date;
    updatedAt: Date;
    approver: EmployeeResponseDto;
}
export declare class ApprovalResponseDto {
    documentId: string;
    documentNumber: string;
    documentType: string;
    title: string;
    content: string;
    status: ApprovalStatus;
    retentionPeriod: string;
    retentionPeriodUnit: string;
    retentionStartDate: Date;
    retentionEndDate: Date;
    implementDate: Date;
    createdAt: Date;
    updatedAt: Date;
    drafter: EmployeeResponseDto;
    approvalSteps: ApprovalStepResponseDto[];
    currentStep?: ApprovalStepResponseDto;
    parentDocument: ApprovalResponseDto;
    files: FileDto[];
}
