export declare class ApprovalStepPreviewDto {
    stepOrder: number;
    stepType: string;
    isRequired: boolean;
    employeeId: string;
    employeeName: string;
    departmentName?: string;
    positionTitle?: string;
    assigneeRule: string;
}
export declare class PreviewApprovalLineResponseDto {
    templateName: string;
    templateDescription?: string;
    steps: ApprovalStepPreviewDto[];
}
