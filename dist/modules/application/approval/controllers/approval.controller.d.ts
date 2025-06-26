import { ApprovalService } from '../approval.service';
import { Employee } from 'src/database/entities';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    approve(documentId: string, user: Employee): Promise<void>;
    reject(documentId: string, user: Employee): Promise<void>;
    implementation(documentId: string, user: Employee): Promise<void>;
    reference(documentId: string, user: Employee): Promise<void>;
}
