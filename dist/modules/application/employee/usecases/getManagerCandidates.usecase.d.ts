import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class GetManagerCandidatesUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(): Promise<EmplyeesByDepartmentResponseDto[]>;
}
