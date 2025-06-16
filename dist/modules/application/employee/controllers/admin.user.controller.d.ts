import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { EmployeeService } from '../employee.service';
export declare class AdminUserController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findUser(): Promise<EmplyeesByDepartmentResponseDto[]>;
    changeRole(changeRoleDto: ChangeRoleDto): Promise<void>;
}
