import { ApprovalLineTemplate } from './form-approval-line.entity';
import { Employee } from './employee.entity';
export declare class ApprovalStepTemplate {
    approvalStepTemplateId: string;
    type: string;
    name: string;
    description: string;
    order: number;
    approverType: string;
    approverValue: string;
    departmentScopeType: string;
    conditionExpression: object;
    isParallel: boolean;
    isMandatory: boolean;
    createdAt: Date;
    updatedAt: Date;
    defaultApproverId: string;
    defaultApprover: Employee;
    approvalLineTemplateId: string;
    approvalLineTemplate: ApprovalLineTemplate;
}
