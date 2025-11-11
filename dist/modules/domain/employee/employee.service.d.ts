import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../common/services/base.service';
import { Employee } from './employee.entity';
export declare class DomainEmployeeService extends BaseService<Employee> {
    private readonly employeeRepository;
    constructor(employeeRepository: DomainEmployeeRepository);
}
