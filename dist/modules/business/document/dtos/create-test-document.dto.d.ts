import { DocumentStatus, ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';
export declare enum TestEmployeeId {
    김규현 = "839e6f06-8d44-43a1-948c-095253c4cf8c",
    김종식 = "604a5c05-e0c0-495f-97bc-b86046db4342",
    우창욱 = "02b1d831-f278-4393-86ec-9db01248a1ec",
    이화영 = "fd3336ea-2b7f-463a-9f21-cced8d68892f",
    조민경 = "1e9cc4b3-affb-4f63-9749-3480cd5261b9",
    박헌남 = "f5f08c1d-9330-40f8-b80c-e75d9442503b",
    유승훈 = "dbfbb104-6560-4557-8079-7845a82ffe14",
    민정호 = "2f0ecd69-1b07-4d33-8f49-b71ef9048d87"
}
export declare class CreateTestDocumentQueryDto {
    title: string;
    content?: string;
    drafterId: TestEmployeeId;
    status: DocumentStatus;
    step1Type: ApprovalStepType;
    step1Approver: TestEmployeeId;
    step1Status: ApprovalStatus;
    step2Type: ApprovalStepType;
    step2Approver: TestEmployeeId;
    step2Status: ApprovalStatus;
    step3Type?: ApprovalStepType;
    step3Approver?: TestEmployeeId;
    step3Status?: ApprovalStatus;
    step4Type?: ApprovalStepType;
    step4Approver?: TestEmployeeId;
    step4Status?: ApprovalStatus;
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
