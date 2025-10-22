import { StepEditRequestDto } from './create-form-request.dto';
export declare class CloneTemplateRequestDto {
    baseTemplateVersionId: string;
    newTemplateName?: string;
    stepEdits?: StepEditRequestDto[];
}
