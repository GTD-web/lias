export declare class CustomApprovalStepDto {
    stepOrder: number;
    stepType: string;
    isRequired: boolean;
    employeeId?: string;
    departmentId?: string;
    assigneeRule: string;
}
export declare class DraftContextDto {
    drafterDepartmentId?: string;
    documentAmount?: number;
    documentType?: string;
}
export declare class SubmitDocumentRequestDto {
    draftContext: DraftContextDto;
    customApprovalSteps?: CustomApprovalStepDto[];
}
