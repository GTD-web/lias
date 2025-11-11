import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { EmployeeStatus } from '../../../common/enums/employee.enum';
export declare class MetadataContext {
    private readonly departmentService;
    private readonly positionService;
    private readonly employeeService;
    private readonly employeeDepartmentPositionService;
    private readonly logger;
    constructor(departmentService: DomainDepartmentService, positionService: DomainPositionService, employeeService: DomainEmployeeService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    getAllDepartments(): Promise<import("../../domain").Department[]>;
    getEmployeesByDepartment(departmentId: string, activeOnly?: boolean): Promise<any[]>;
    getAllPositions(): Promise<import("../../domain").Position[]>;
    searchEmployees(search?: string, departmentId?: string): Promise<any[]>;
    getEmployeeById(employeeId: string): Promise<{
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber: string;
        status: EmployeeStatus;
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
    getDepartmentHierarchyWithEmployees(activeOnly?: boolean): Promise<any[]>;
}
