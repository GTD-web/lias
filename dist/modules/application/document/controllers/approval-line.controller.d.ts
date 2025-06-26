import { DocumentService } from '../document.service';
import { CreateFormApprovalLineDto, FormApprovalLineResponseDto, UpdateFormApprovalLineDto } from '../dtos/approval-line.dto';
import { Employee } from '../../../../database/entities/employee.entity';
import { PaginationData } from '../../../../common/dtos/pagination-response.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ApprovalLineType } from '../../../../common/enums/approval.enum';
export declare class ApprovalLineController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createApprovalLine(user: Employee, createFormApprovalLineDto: CreateFormApprovalLineDto): Promise<FormApprovalLineResponseDto>;
    findAllApprovalLines(query: PaginationQueryDto, type?: ApprovalLineType): Promise<PaginationData<FormApprovalLineResponseDto>>;
    findApprovalLineById(id: string): Promise<FormApprovalLineResponseDto>;
    updateApprovalLineById(user: Employee, id: string, updateFormApprovalLineDto: UpdateFormApprovalLineDto): Promise<FormApprovalLineResponseDto>;
    deleteApprovalLineById(id: string): Promise<boolean>;
}
