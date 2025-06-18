import { FormApprovalLine } from './form-approval-line.entity';
export declare class DocumentForm {
    documentFormId: string;
    type: string;
    name: string;
    description: string;
    template: string;
    formApprovalLines: FormApprovalLine[];
}
