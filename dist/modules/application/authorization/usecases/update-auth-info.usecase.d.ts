import { SsoResponseDto } from '../dtos/sso-response.dto';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { Employee } from '../../../../database/entities/employee.entity';
export declare class UpdateAuthInfoUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(ssoResponse: SsoResponseDto): Promise<Employee>;
}
