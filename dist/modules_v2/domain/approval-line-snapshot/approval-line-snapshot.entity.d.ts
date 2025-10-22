import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';
import { ApprovalStepSnapshot } from '../approval-step-snapshot/approval-step-snapshot.entity';
export declare class ApprovalLineSnapshot {
    id: string;
    documentId: string;
    sourceTemplateVersionId?: string;
    snapshotName: string;
    snapshotDescription?: string;
    metadata?: Record<string, any>;
    frozenAt: Date;
    createdAt: Date;
    sourceTemplateVersion?: ApprovalLineTemplateVersion;
    steps: ApprovalStepSnapshot[];
}
