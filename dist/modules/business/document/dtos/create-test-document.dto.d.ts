import { DocumentStatus, ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';
export declare enum TestEmployeeName {
    김규현 = "\uAE40\uADDC\uD604",
    김종식 = "\uAE40\uC885\uC2DD",
    우창욱 = "\uC6B0\uCC3D\uC6B1",
    이화영 = "\uC774\uD654\uC601",
    조민경 = "\uC870\uBBFC\uACBD",
    박헌남 = "\uBC15\uD5CC\uB0A8",
    유승훈 = "\uC720\uC2B9\uD6C8",
    민정호 = "\uBBFC\uC815\uD638"
}
export declare const TEST_EMPLOYEE_ID_MAP: Record<TestEmployeeName, string>;
export declare class CreateTestDocumentQueryDto {
    title: string;
    content?: string;
    drafterName: TestEmployeeName;
    status: DocumentStatus;
    agreement1Approver?: TestEmployeeName;
    agreement1Status?: ApprovalStatus;
    agreement2Approver?: TestEmployeeName;
    agreement2Status?: ApprovalStatus;
    approval1Approver: TestEmployeeName;
    approval1Status: ApprovalStatus;
    approval2Approver?: TestEmployeeName;
    approval2Status?: ApprovalStatus;
    approval3Approver?: TestEmployeeName;
    approval3Status?: ApprovalStatus;
    implementationApprover: TestEmployeeName;
    implementationStatus: ApprovalStatus;
    reference1Approver?: TestEmployeeName;
    reference1Status?: ApprovalStatus;
    reference2Approver?: TestEmployeeName;
    reference2Status?: ApprovalStatus;
}
export interface TestApprovalStep {
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    status: ApprovalStatus;
    comment?: string;
}
export declare class CreateTestDocumentDto {
    title: string;
    content?: string;
    drafterId: string;
    status: DocumentStatus;
    approvalSteps: TestApprovalStep[];
}
export declare class CreateTestDocumentResponseDto {
    documentId: string;
    documentNumber: string;
    title: string;
    status: DocumentStatus;
    approvalStepsCount: number;
    message: string;
}
