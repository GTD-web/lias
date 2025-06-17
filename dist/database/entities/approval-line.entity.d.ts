import { Document } from './document.entity';
import { ApprovalStep } from './approval-step.entity';
export declare class ApprovalLine {
    approvalLineId: string;
    approvalLineType: string;
    createdAt: Date;
    updatedAt: Date;
    documentId: string;
    document: Document;
    approvalSteps: ApprovalStep[];
}
