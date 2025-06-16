import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class ChangeRoleUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(changeRoleDto: ChangeRoleDto): Promise<void>;
}
