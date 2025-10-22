import { StepEditRequestDto } from './create-form-request.dto';
export declare class UpdateFormVersionRequestDto {
    formId?: string;
    versionNote?: string;
    template?: string;
    lineTemplateVersionId?: string;
    cloneAndEdit?: boolean;
    baseLineTemplateVersionId?: string;
    stepEdits?: StepEditRequestDto[];
}
