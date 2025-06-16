import { DomainEmployeeService } from '@resource/domain/employee/employee.service';
import { MMSEmployeeResponseDto } from '@resource/application/employee/dtos/mms-employee-response.dto';
export declare class SyncEmployeeUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employees: MMSEmployeeResponseDto[]): Promise<void>;
}
