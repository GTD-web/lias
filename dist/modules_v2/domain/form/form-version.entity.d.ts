import { Form } from './form.entity';
import { FormVersionApprovalLineTemplateVersion } from '../form-version-approval-line-template-version/form-version-approval-line-template-version.entity';
import { Document } from '../document/document.entity';
export declare class FormVersion {
    id: string;
    formId: string;
    versionNo: number;
    template: string;
    isActive: boolean;
    changeReason?: string;
    createdBy?: string;
    createdAt: Date;
    updatedAt: Date;
    form: Form;
    approvalLineTemplateMappings: FormVersionApprovalLineTemplateVersion[];
    documents: Document[];
}
