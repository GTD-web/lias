import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
export declare class GetEmployeeDetailUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employeeId: string): Promise<UserResponseDto>;
}
