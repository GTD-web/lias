import { FormVersion } from '../form/form-version.entity';
import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';
export declare class FormVersionApprovalLineTemplateVersion {
    id: string;
    formVersionId: string;
    approvalLineTemplateVersionId: string;
    isDefault: boolean;
    displayOrder: number;
    createdAt: Date;
    formVersion: FormVersion;
    approvalLineTemplateVersion: ApprovalLineTemplateVersion;
}
