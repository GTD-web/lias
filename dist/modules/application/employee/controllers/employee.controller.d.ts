import { EmployeeService } from '../employee.service';
import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';
export declare class UserEmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]>;
}
