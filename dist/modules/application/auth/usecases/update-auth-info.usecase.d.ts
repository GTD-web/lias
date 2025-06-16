import { Employee } from '@libs/entities';
import { SsoResponseDto } from '@src/application/auth/dto/sso-response.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class UpdateAuthInfoUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(ssoResponse: SsoResponseDto): Promise<Employee>;
}
