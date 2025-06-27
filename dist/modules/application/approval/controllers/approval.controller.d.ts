import { ApprovalService } from '../approval.service';
import { Employee } from 'src/database/entities';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalResponseDto } from '../dtos/approval-draft.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { DocumentListType } from 'src/common/enums/approval.enum';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    approve(documentId: string, user: Employee): Promise<void>;
    reject(documentId: string, user: Employee): Promise<void>;
    implementation(documentId: string, user: Employee): Promise<void>;
    reference(documentId: string, user: Employee): Promise<void>;
    getDocuments(user: Employee, query: PaginationQueryDto, listType: DocumentListType): Promise<PaginationData<ApprovalResponseDto>>;
}
