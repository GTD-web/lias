import { MetadataContext } from '../../../context/metadata/metadata.context';
export declare class MetadataQueryController {
    private readonly metadataContext;
    constructor(metadataContext: MetadataContext);
    getDepartments(): Promise<import("../../../domain").Department[]>;
    getEmployeesByDepartment(departmentId: string, activeOnly?: string): Promise<any[]>;
    getDepartmentHierarchyWithEmployees(activeOnly?: string): Promise<any[]>;
    getPositions(): Promise<import("../../../domain").Position[]>;
    getEmployees(search?: string, departmentId?: string): Promise<any[]>;
    getEmployee(employeeId: string): Promise<{
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber: string;
        status: import("../../../../common/enums").EmployeeStatus;
        hireDate: Date;
        departments: {
            department: {
                id: string;
                departmentCode: string;
                departmentName: string;
            };
            position: {
                id: string;
                positionCode: string;
                positionTitle: string;
                level: number;
                hasManagementAuthority: boolean;
            };
        }[];
    }>;
}
