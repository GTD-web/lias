import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(repository: Repository<Employee>);
    findByEmail(email: string): Promise<Employee | null>;
    findByEmployeeNumber(employeeNumber: string): Promise<Employee | null>;
}
