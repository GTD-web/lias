import { ApprovalStepType, ApprovalStatus } from '../../../common/enums/approval.enum';
import { ApprovalLineSnapshot } from '../approval-line-snapshot/approval-line-snapshot.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
export declare class ApprovalStepSnapshot {
    id: string;
    snapshotId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule?: string;
    approverId: string;
    approverDepartmentId?: string;
    approverPositionId?: string;
    status: ApprovalStatus;
    comment?: string;
    approvedAt?: Date;
    required: boolean;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    snapshot: ApprovalLineSnapshot;
    approver: Employee;
    approverDepartment?: Department;
    approverPosition?: Position;
}
