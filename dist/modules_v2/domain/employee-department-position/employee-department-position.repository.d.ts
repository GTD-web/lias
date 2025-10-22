import { Repository } from 'typeorm';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainEmployeeDepartmentPositionRepository extends BaseRepository<EmployeeDepartmentPosition> {
    constructor(repository: Repository<EmployeeDepartmentPosition>);
    findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition[]>;
    findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
    findManagersByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
}
