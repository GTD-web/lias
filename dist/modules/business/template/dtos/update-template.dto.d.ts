import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
import { ApprovalStepTemplateItemDto } from './create-template.dto';
export declare class UpdateApprovalStepTemplateItemDto extends ApprovalStepTemplateItemDto {
    id?: string;
}
export declare class UpdateTemplateDto {
    name?: string;
    description?: string;
    template?: string;
    status?: DocumentTemplateStatus;
    categoryId?: string | null;
    approvalSteps?: UpdateApprovalStepTemplateItemDto[];
}
