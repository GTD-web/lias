import { DataSource } from 'typeorm';
import { DomainFormService } from '../../domain/form/form.service';
import { DomainFormVersionService } from '../../domain/form/form-version.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainApprovalLineTemplateService } from '../../domain/approval-line-template/approval-line-template.service';
import { DomainApprovalLineTemplateVersionService } from '../../domain/approval-line-template/approval-line-template-version.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainApprovalLineSnapshotService } from '../../domain/approval-line-snapshot/approval-line-snapshot.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainFormVersionApprovalLineTemplateVersionService } from '../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainPositionService } from '../../domain/position/position.service';
export declare class TestDataContext {
    private readonly dataSource;
    private readonly formService;
    private readonly formVersionService;
    private readonly documentService;
    private readonly approvalLineTemplateService;
    private readonly approvalLineTemplateVersionService;
    private readonly approvalStepTemplateService;
    private readonly approvalLineSnapshotService;
    private readonly approvalStepSnapshotService;
    private readonly formVersionApprovalLineTemplateVersionService;
    private readonly employeeService;
    private readonly departmentService;
    private readonly employeeDepartmentPositionService;
    private readonly positionService;
    private readonly logger;
    constructor(dataSource: DataSource, formService: DomainFormService, formVersionService: DomainFormVersionService, documentService: DomainDocumentService, approvalLineTemplateService: DomainApprovalLineTemplateService, approvalLineTemplateVersionService: DomainApprovalLineTemplateVersionService, approvalStepTemplateService: DomainApprovalStepTemplateService, approvalLineSnapshotService: DomainApprovalLineSnapshotService, approvalStepSnapshotService: DomainApprovalStepSnapshotService, formVersionApprovalLineTemplateVersionService: DomainFormVersionApprovalLineTemplateVersionService, employeeService: DomainEmployeeService, departmentService: DomainDepartmentService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService, positionService: DomainPositionService);
    createTestData(employeeId: string, departmentId: string): Promise<{
        forms: any[];
        formVersions: any[];
        documents: any[];
        approvalLineTemplates: any[];
        approvalLineTemplateVersions: any[];
        approvalStepTemplates: any[];
        approvalLineSnapshots: any[];
        approvalStepSnapshots: any[];
    }>;
    private getOtherEmployeesInDepartment;
    private getDepartmentHead;
    private getParentDepartment;
    private getParentDepartmentHead;
    private getRandomEmployee;
    private createSimpleApprovalLine;
    private createComplexApprovalLine;
    private createAgreementApprovalLine;
    private createFormWithApprovalLine;
    private createDocument;
    private createDocumentWithSnapshot;
    deleteTestData(createdData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAllDocuments(): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAllFormsAndTemplates(): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAllTestData(): Promise<{
        success: boolean;
        message: string;
    }>;
    createTestDataByScenario(employeeId: string, departmentId: string, dto: any): Promise<{
        forms: any[];
        formVersions: any[];
        documents: any[];
        approvalLineTemplates: any[];
        approvalLineTemplateVersions: any[];
        approvalStepTemplates: any[];
        approvalLineSnapshots: any[];
        approvalStepSnapshots: any[];
    } | {
        forms: import("../../domain").Form[];
        documents: any[];
        approvalLines: any[];
    }>;
    private createSimpleApprovalScenario;
    private createMultiLevelApprovalScenario;
    private createAgreementProcessScenario;
    private createImplementationProcessScenario;
    private createRejectedDocumentScenario;
    private createCancelledDocumentScenario;
    private createWithReferenceScenario;
    private createParallelAgreementScenario;
    private createFullProcessScenario;
    private createNoApprovalLineScenario;
    private createFormWithoutApprovalLine;
}
