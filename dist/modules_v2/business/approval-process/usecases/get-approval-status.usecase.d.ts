import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { ApprovalStepResponseDto } from '../dtos/approval-process-response.dto';
import { DomainDocumentService } from '../../../domain/document/document.service';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
export declare class GetApprovalStatusUsecase {
    private readonly approvalProcessContext;
    private readonly documentService;
    private readonly employeeService;
    private readonly departmentService;
    private readonly employeeDepartmentPositionService;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext, documentService: DomainDocumentService, employeeService: DomainEmployeeService, departmentService: DomainDepartmentService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    getMyPendingApprovals(approverId: string): Promise<ApprovalStepResponseDto[]>;
    getApprovalSteps(documentId: string): Promise<{
        documentId: string;
        steps: ApprovalStepResponseDto[];
        totalSteps: number;
        completedSteps: number;
    }>;
}
