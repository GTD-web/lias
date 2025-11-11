import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
export declare enum ManagerType {
    DIRECT = "direct",
    FUNCTIONAL = "functional",
    PROJECT = "project",
    TEMPORARY = "temporary",
    DEPUTY = "deputy"
}
export declare class EmployeeDepartmentPosition {
    id: string;
    employeeId: string;
    departmentId: string;
    positionId: string;
    isManager: boolean;
    createdAt: Date;
    updatedAt: Date;
    employee: Employee;
    department: Department;
    position: Position;
}
