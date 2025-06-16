import { EmployeeService } from '@src/application/employee/employee.service';
import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';
export declare class AdminResourceManagerController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]>;
}
