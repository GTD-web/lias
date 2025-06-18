import { EmployeeService } from '../employee.service';
import { EmplyeesByDepartmentResponseDto } from '../dtos/employees-by-department-response.dto';
export declare class Controller {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]>;
}
