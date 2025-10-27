import { ApprovalLineTemplateVersionResponseDto } from './approval-flow-response.dto';
import { ApprovalStepTemplateResponseDto } from './approval-flow-response.dto';
export declare class ApprovalLineTemplateVersionWithStepsResponseDto extends ApprovalLineTemplateVersionResponseDto {
    steps?: ApprovalStepTemplateResponseDto[];
}
