import { ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';
import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
export declare class ApprovalStepTemplate {
    id: string;
    lineTemplateVersionId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    defaultApproverId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
    required: boolean;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    lineTemplateVersion: ApprovalLineTemplateVersion;
    defaultApprover?: Employee;
    targetDepartment?: Department;
    targetPosition?: Position;
}
