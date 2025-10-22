import { ApprovalLineType, DepartmentScopeType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';
export declare class ApprovalLineTemplate {
    id: string;
    name: string;
    description?: string;
    type: ApprovalLineType;
    orgScope: DepartmentScopeType;
    departmentId?: string;
    status: ApprovalLineTemplateStatus;
    currentVersionId?: string;
    createdBy?: string;
    createdAt: Date;
    updatedAt: Date;
    currentVersion?: any;
    versions: any[];
}
