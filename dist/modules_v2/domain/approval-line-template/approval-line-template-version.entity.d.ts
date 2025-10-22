import { ApprovalLineTemplate } from './approval-line-template.entity';
import { ApprovalStepTemplate } from '../approval-step-template/approval-step-template.entity';
import { FormVersionApprovalLineTemplateVersion } from '../form-version-approval-line-template-version/form-version-approval-line-template-version.entity';
import { ApprovalLineSnapshot } from '../approval-line-snapshot/approval-line-snapshot.entity';
export declare class ApprovalLineTemplateVersion {
    id: string;
    templateId: string;
    versionNo: number;
    isActive: boolean;
    changeReason?: string;
    createdBy?: string;
    createdAt: Date;
    updatedAt: Date;
    template: ApprovalLineTemplate;
    steps: ApprovalStepTemplate[];
    formVersionMappings: FormVersionApprovalLineTemplateVersion[];
    snapshots: ApprovalLineSnapshot[];
}
