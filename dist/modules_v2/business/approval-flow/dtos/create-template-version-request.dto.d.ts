import { StepEditRequestDto } from './create-form-request.dto';
export declare class CreateTemplateVersionRequestDto {
    templateId?: string;
    versionNote?: string;
    steps: StepEditRequestDto[];
}
