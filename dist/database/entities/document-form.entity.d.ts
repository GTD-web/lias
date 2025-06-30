import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentType } from './document-type.entity';
import { AutoFillType } from '../../common/enums/approval.enum';
export declare class DocumentForm {
    documentFormId: string;
    name: string;
    description: string;
    template: string;
    autoFillType: AutoFillType;
    formApprovalLineId: string;
    formApprovalLine: FormApprovalLine;
    documentTypeId: string;
    documentType: DocumentType;
}
