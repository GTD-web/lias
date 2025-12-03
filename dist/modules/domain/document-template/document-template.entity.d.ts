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
    이름을설정한다(name: string): void;
    코드를설정한다(code: string): void;
    설명을설정한다(description?: string): void;
    템플릿을설정한다(template: string): void;
    카테고리를설정한다(categoryId?: string): void;
    상태를설정한다(status: DocumentTemplateStatus): void;
    활성화한다(): void;
}
