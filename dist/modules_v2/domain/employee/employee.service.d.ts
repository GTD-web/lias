import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../common/services/base.service';
import { Employee } from './employee.entity';
export declare class DomainEmployeeService extends BaseService<Employee> {
    private readonly employeeRepository;
    constructor(employeeRepository: DomainEmployeeRepository);
    findByEmployeeId(id: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee>;
    findByEmployeeNumber(employeeNumber: string): Promise<Employee>;
    findOrNullByEmployeeNumber(employeeNumber: string): Promise<Employee | null>;
    findOrNullByEmail(email: string): Promise<Employee | null>;
    findOrNullByEmployeeId(id: string): Promise<Employee | null>;
}
