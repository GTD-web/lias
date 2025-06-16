import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { Employee } from '@libs/entities/employee.entity';
export declare class ValidateUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(email: string, password: string): Promise<Employee>;
}
