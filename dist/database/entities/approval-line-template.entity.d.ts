import { DocumentType } from './document-type.entity';
import { ApprovalStepTemplate } from './approval-step-template.entity';
export declare class ApprovalLineTemplate {
    approvalLineTemplateId: string;
    approvalLineType: string;
    createdAt: Date;
    updatedAt: Date;
    documentTypeId: string;
    documentType: DocumentType;
    approvalStepTemplates: ApprovalStepTemplate[];
}
