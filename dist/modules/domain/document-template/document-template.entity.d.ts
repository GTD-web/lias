import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';
import { ApprovalStepTemplate } from '../approval-step-template/approval-step-template.entity';
import { Category } from '../category/category.entity';
export declare class DocumentTemplate {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: DocumentTemplateStatus;
    template: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
    approvalStepTemplates: ApprovalStepTemplate[];
}
