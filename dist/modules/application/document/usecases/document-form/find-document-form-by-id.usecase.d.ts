import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';
import { Employee } from 'src/database/entities/employee.entity';
import { DataSource } from 'typeorm';
import { DomainFormApprovalStepService } from 'src/modules/domain/form-approval-step/form-approval-step.service';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
export declare class FindDocumentFormByIdUseCase {
    private readonly documentFormService;
    private readonly formApprovalStepService;
    private readonly departmentService;
    private readonly employeeService;
    private readonly dataSource;
    constructor(documentFormService: DomainDocumentFormService, formApprovalStepService: DomainFormApprovalStepService, departmentService: DomainDepartmentService, employeeService: DomainEmployeeService, dataSource: DataSource);
    execute(documentFormId: string, user: Employee): Promise<DocumentFormResponseDto>;
    private generateAutoApprovalSteps;
    private findSuperiorsByDepartment;
    private getDepartmentHierarchy;
    private findSuperiorsInHierarchy;
}
