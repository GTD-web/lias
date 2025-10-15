import { ExportAllDataResponseDto } from '../dtos/export-all-data.dto';
import { DomainPositionService } from '../../../domain/position/position.service';
import { DomainRankService } from '../../../domain/rank/rank.service';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
export declare class SyncAllMetadataUsecase {
    private readonly positionService;
    private readonly rankService;
    private readonly departmentService;
    private readonly employeeService;
    private readonly employeeDepartmentPositionService;
    private readonly logger;
    constructor(positionService: DomainPositionService, rankService: DomainRankService, departmentService: DomainDepartmentService, employeeService: DomainEmployeeService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    execute(data: ExportAllDataResponseDto): Promise<void>;
    private syncPositions;
    private syncRanks;
    private syncDepartments;
    private syncEmployees;
    private syncEmployeeDepartmentPositions;
}
