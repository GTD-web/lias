import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentType } from './document-type.entity';
import { ReferencerInfo, ImplementerInfo } from '../../common/types/entity.type';
export declare class DocumentForm {
    documentFormId: string;
    name: string;
    description: string;
    template: string;
    receiverInfo: ReferencerInfo[];
    implementerInfo: ImplementerInfo[];
    formApprovalLineId: string;
    formApprovalLine: FormApprovalLine;
    documentTypeId: string;
    documentType: DocumentType;
}
