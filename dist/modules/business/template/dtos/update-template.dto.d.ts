import { ApprovalStepTemplateItemDto } from './create-template.dto';
export declare class UpdateApprovalStepTemplateItemDto extends ApprovalStepTemplateItemDto {
    id?: string;
}
export declare class UpdateTemplateDto {
    name?: string;
    code?: string;
    description?: string;
    template?: string;
    categoryId?: string | null;
    approvalSteps?: UpdateApprovalStepTemplateItemDto[];
}
