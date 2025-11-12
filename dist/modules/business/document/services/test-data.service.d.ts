import { Repository } from 'typeorm';
import { Employee } from '../../../domain/employee/employee.entity';
import { Department } from '../../../domain/department/department.entity';
import { EmployeeDepartmentPosition } from '../../../domain/employee-department-position/employee-department-position.entity';
import { DocumentTemplate } from '../../../domain/document-template/document-template.entity';
import { Document } from '../../../domain/document/document.entity';
import { ApprovalStepSnapshot } from '../../../domain/approval-step-snapshot/approval-step-snapshot.entity';
import { ApprovalStepTemplate } from '../../../domain/approval-step-template/approval-step-template.entity';
import { Category } from '../../../domain/category/category.entity';
import { DocumentService } from './document.service';
import { ApprovalStepType } from '../../../../common/enums/approval.enum';
export declare class TestDataService {
    private readonly employeeRepository;
    private readonly departmentRepository;
    private readonly edpRepository;
    private readonly documentTemplateRepository;
    private readonly documentRepository;
    private readonly approvalStepSnapshotRepository;
    private readonly approvalStepTemplateRepository;
    private readonly categoryRepository;
    private readonly documentService;
    private readonly logger;
    private webPartEmployees;
    private cachedAt;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>, edpRepository: Repository<EmployeeDepartmentPosition>, documentTemplateRepository: Repository<DocumentTemplate>, documentRepository: Repository<Document>, approvalStepSnapshotRepository: Repository<ApprovalStepSnapshot>, approvalStepTemplateRepository: Repository<ApprovalStepTemplate>, categoryRepository: Repository<Category>, documentService: DocumentService);
    private getWebPartEmployees;
    private getRandomEmployee;
    private getRandomEmployees;
    private ensureDefaultCategory;
    private createDefaultTemplate;
    private getDocumentTemplate;
    createTestDocument(options?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
    }): Promise<{
        document: Document;
        drafter: Employee;
        approvalSteps: {
            employee: Employee;
            stepOrder: number;
            stepType: ApprovalStepType;
            approverId: string;
        }[];
    }>;
    createAndSubmitTestDocument(options?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
    }): Promise<{
        document: Document;
        drafter: Employee;
        approvalSteps: {
            employee: Employee;
            stepOrder: number;
            stepType: ApprovalStepType;
            approverId: string;
        }[];
    }>;
    createMultipleTestDocuments(count: number, submitImmediately?: boolean): Promise<any[]>;
    getWebPartEmployeeList(): Promise<{
        id: string;
        name: string;
        employeeNumber: string;
        email: string;
        rankTitle: string;
    }[]>;
    getAvailableTemplates(): Promise<DocumentTemplate[]>;
    deleteAllTestData(): Promise<{
        success: boolean;
        message: string;
        deleted: {
            approvalStepSnapshots: number;
            documents: number;
            approvalStepTemplates: number;
            documentTemplates: number;
            categories: number;
        };
        total: number;
    }>;
    deleteDocumentsOnly(): Promise<{
        success: boolean;
        message: string;
        deleted: {
            approvalStepSnapshots: number;
            documents: number;
        };
        total: number;
    }>;
    deleteTestCategory(): Promise<{
        success: boolean;
        message: string;
        deleted: number;
    } | {
        success: boolean;
        message: string;
        deleted: {
            templates: number;
            category: number;
        };
    }>;
}
