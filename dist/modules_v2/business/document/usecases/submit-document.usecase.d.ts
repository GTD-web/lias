import { DocumentContext } from '../../../context/document/document.context';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { DomainFormVersionService } from '../../../domain/form/form-version.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
import { SubmitDocumentRequestDto, DocumentResponseDto } from '../dtos';
export declare class SubmitDocumentUsecase {
    private readonly documentContext;
    private readonly approvalFlowContext;
    private readonly formVersionService;
    private readonly employeeDepartmentPositionService;
    private readonly logger;
    constructor(documentContext: DocumentContext, approvalFlowContext: ApprovalFlowContext, formVersionService: DomainFormVersionService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    execute(drafterId: string, documentId: string, dto: SubmitDocumentRequestDto): Promise<DocumentResponseDto>;
    private validateApprovalSteps;
}
