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
    문서템플릿을설정한다(documentTemplateId: string): void;
    결재단계순서를설정한다(stepOrder: number): void;
    결재단계타입을설정한다(stepType: ApprovalStepType): void;
    결재자할당규칙을설정한다(assigneeRule: AssigneeRule): void;
    대상직원을설정한다(targetEmployeeId?: string): void;
    대상부서를설정한다(targetDepartmentId?: string): void;
    대상직책을설정한다(targetPositionId?: string): void;
}
