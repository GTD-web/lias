import { DomainEmployeeDepartmentPositionRepository } from './employee-department-position.repository';
import { BaseService } from '../../../common/services/base.service';
import { EmployeeDepartmentPosition } from '../../../database/entities';
export declare class DomainEmployeeDepartmentPositionService extends BaseService<EmployeeDepartmentPosition> {
    private readonly employeeDepartmentPositionRepository;
    constructor(employeeDepartmentPositionRepository: DomainEmployeeDepartmentPositionRepository);
    findById(id: string): Promise<EmployeeDepartmentPosition>;
    findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition[]>;
    findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
    findManagersByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
    findByEmployeeAndDepartment(employeeId: string, departmentId: string): Promise<EmployeeDepartmentPosition | null>;
    createEmployeeDepartmentPosition(employeeId: string, departmentId: string, positionId: string, isManager?: boolean): Promise<EmployeeDepartmentPosition>;
    updateEmployeeDepartmentPosition(id: string, positionId?: string, isManager?: boolean): Promise<EmployeeDepartmentPosition>;
    removeEmployeeDepartmentPosition(id: string): Promise<void>;
    findByPositionId(positionId: string): Promise<EmployeeDepartmentPosition[]>;
    findAllManagers(): Promise<EmployeeDepartmentPosition[]>;
}
