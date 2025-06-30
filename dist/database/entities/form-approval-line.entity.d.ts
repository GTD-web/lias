import { DocumentForm } from './document-form.entity';
import { FormApprovalStep } from './form-approval-step.entity';
import { Employee } from './employee.entity';
import { ApprovalLineType } from 'src/common/enums/approval.enum';
export declare class FormApprovalLine {
    formApprovalLineId: string;
    name: string;
    description: string;
    type: ApprovalLineType;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    employeeId: string;
    documentForms: DocumentForm[];
    employee: Employee;
    formApprovalSteps: FormApprovalStep[];
}
