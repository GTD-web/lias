import { DocumentService } from '../document.service';
import { CreateFormApprovalLineDto, FormApprovalLineResponseDto, UpdateFormApprovalLineDto } from '../dtos/approval-line.dto';
export declare class ApprovalLineController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createApprovalLine(createFormApprovalLineDto: CreateFormApprovalLineDto): Promise<FormApprovalLineResponseDto>;
    findAllApprovalLines(): Promise<FormApprovalLineResponseDto[]>;
    findApprovalLineById(id: string): Promise<FormApprovalLineResponseDto>;
    updateApprovalLineById(id: string, updateFormApprovalLineDto: UpdateFormApprovalLineDto): Promise<FormApprovalLineResponseDto>;
    deleteApprovalLineById(id: string): Promise<boolean>;
}
