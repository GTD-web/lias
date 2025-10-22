import { StepEditRequestDto } from './create-form-request.dto';
import { ApprovalLineType, DepartmentScopeType } from '../../../../common/enums/approval.enum';
export declare class CreateApprovalLineTemplateRequestDto {
    name: string;
    description?: string;
    type: ApprovalLineType;
    orgScope: DepartmentScopeType;
    departmentId?: string;
    steps: StepEditRequestDto[];
}
