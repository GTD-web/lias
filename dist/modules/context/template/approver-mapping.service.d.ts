import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
export declare class ApproverMappingService {
    private readonly documentTemplateService;
    private readonly employeeService;
    private readonly departmentService;
    private readonly logger;
    constructor(documentTemplateService: DomainDocumentTemplateService, employeeService: DomainEmployeeService, departmentService: DomainDepartmentService);
    getDocumentTemplateWithMappedApprovers(templateId: string, drafterId: string): Promise<{
        drafter: {
            id: string;
            employeeNumber: string;
            name: string;
            email: string;
            department: {
                id: string;
                departmentName: string;
                departmentCode: string;
            };
            position: {
                id: string;
                positionTitle: string;
                positionCode: string;
                level: number;
            };
        };
        approvalStepTemplates: any[];
        id: string;
        name: string;
        code: string;
        description?: string;
        status: import("../../../common/enums/approval.enum").DocumentTemplateStatus;
        template: string;
        categoryId?: string;
        createdAt: Date;
        updatedAt: Date;
        category?: import("../../domain").Category;
    }>;
    private findDirectSuperior;
    private findHierarchyApprovers;
    private isDepartmentHead;
    private findDepartmentHead;
    private getDepartmentPathToRoot;
    private findDepartmentEmployees;
}
