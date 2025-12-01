import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
export declare class MetadataSyncContext {
    private readonly positionService;
    private readonly rankService;
    private readonly departmentService;
    private readonly employeeService;
    private readonly employeeDepartmentPositionService;
    private readonly logger;
    constructor(positionService: DomainPositionService, rankService: DomainRankService, departmentService: DomainDepartmentService, employeeService: DomainEmployeeService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    syncPositions(positions: any[]): Promise<void>;
    syncRanks(ranks: any[]): Promise<void>;
    syncDepartments(departments: any[]): Promise<void>;
    syncEmployees(employees: any[]): Promise<void>;
    syncEmployeeDepartmentPositions(employeeDepartmentPositions: any[]): Promise<void>;
    private deleteDepartmentsRecursively;
    clearAllMetadata(): Promise<void>;
    syncAllMetadata(data: {
        positions: any[];
        ranks: any[];
        departments: any[];
        employees: any[];
        employeeDepartmentPositions: any[];
    }): Promise<void>;
}
