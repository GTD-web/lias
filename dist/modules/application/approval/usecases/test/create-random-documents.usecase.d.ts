import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainDocumentFormService } from 'src/modules/domain/document-form/document-form.service';
import { DomainDocumentTypeService } from 'src/modules/domain/document-type/document-type.service';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { Employee } from 'src/database/entities/employee.entity';
import { Document } from 'src/database/entities/document.entity';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { DocumentForm } from 'src/database/entities/document-form.entity';
import { DocumentType } from 'src/database/entities/document-type.entity';
import { Department } from 'src/database/entities/department.entity ';
export declare class CreateRandomDocumentsUseCase {
    private readonly employeeService;
    private readonly documentService;
    private readonly approvalStepService;
    private readonly documentFormService;
    private readonly documentTypeService;
    private readonly departmentService;
    constructor(employeeService: DomainEmployeeService, documentService: DomainDocumentService, approvalStepService: DomainApprovalStepService, documentFormService: DomainDocumentFormService, documentTypeService: DomainDocumentTypeService, departmentService: DomainDepartmentService);
    deleteAll(): Promise<void>;
    execute(count?: number): Promise<{
        employees: Employee[];
        departments: Department[];
        documentTypes: DocumentType[];
        documentForms: DocumentForm[];
        documents: Document[];
        approvalSteps: ApprovalStep[];
    }>;
    private ensureBasicData;
    private createDocumentTypes;
    private createDocumentForms;
    private createRandomDocument;
    private createRandomApprovalSteps;
    private getRandomStatus;
    private getRandomDate;
}
