import { DocumentForm } from './document-form.entity';
import { FormApprovalStep } from './form-approval-step.entity';
export declare class FormApprovalLine {
    formApprovalLineId: string;
    formApprovalLineType: string;
    createdAt: Date;
    updatedAt: Date;
    documentFormId: string;
    documentForm: DocumentForm;
    formApprovalSteps: FormApprovalStep[];
}
