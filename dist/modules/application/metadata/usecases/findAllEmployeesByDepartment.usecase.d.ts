import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { MetadataResponseDto } from '../dtos/metadata-response.dto';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
export declare class FindAllEmployeesByDepartmentUsecase {
    private readonly employeeService;
    private readonly departmentService;
    constructor(employeeService: DomainEmployeeService, departmentService: DomainDepartmentService);
    execute(): Promise<MetadataResponseDto>;
    private buildDepartmentTree;
    private sortEmployees;
}
