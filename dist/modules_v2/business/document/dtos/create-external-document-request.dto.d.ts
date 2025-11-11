export declare class CustomApprovalStepDto {
    stepOrder: number;
    stepType: string;
    isRequired: boolean;
    employeeId?: string;
    departmentId?: string;
    assigneeRule: string;
}
export declare class CreateExternalDocumentRequestDto {
    title: string;
    content: string;
    metadata?: Record<string, any>;
    customApprovalSteps?: CustomApprovalStepDto[];
}
