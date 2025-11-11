import { ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';
import { DocumentTemplate } from '../document-template/document-template.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
export declare class ApprovalStepTemplate {
    id: string;
    documentTemplateId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
    documentTemplate: DocumentTemplate;
    targetEmployee?: Employee;
    targetDepartment?: Department;
    targetPosition?: Position;
}
