import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { MMSEmployeeResponseDto } from '../dtos/mms-employee-response.dto';
export declare class SyncEmployeeUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employees: MMSEmployeeResponseDto[]): Promise<void>;
}
