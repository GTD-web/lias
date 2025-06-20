import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { Employee } from 'src/database/entities/employee.entity';
export declare class FindMeUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(user: Employee): Promise<Employee>;
}
