import { FormApprovalLine } from './form-approval-line.entity';
import { User } from './user.entity';
export declare class FormApprovalLineCustom {
    formApprovalLineCustomId: string;
    name: string;
    description: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    formApprovalLineId: string;
    userId: string;
    formApprovalLine: FormApprovalLine;
    user: User;
}
