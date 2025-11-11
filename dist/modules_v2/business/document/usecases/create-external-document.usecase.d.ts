import { DocumentContext } from '../../../context/document/document.context';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
import { CreateExternalDocumentRequestDto, DocumentResponseDto } from '../dtos';
import { DataSource } from 'typeorm';
export declare class CreateExternalDocumentUsecase {
    private readonly documentContext;
    private readonly approvalFlowContext;
    private readonly employeeDepartmentPositionService;
    private readonly dataSource;
    private readonly logger;
    constructor(documentContext: DocumentContext, approvalFlowContext: ApprovalFlowContext, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService, dataSource: DataSource);
    execute(drafterId: string, dto: CreateExternalDocumentRequestDto): Promise<DocumentResponseDto>;
}
