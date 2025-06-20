import { DomainDepartmentService } from '../../../domain/department/department.service';
import { MMSDepartmentResponseDto } from '../dtos/mms-department-response.dto';
export declare class SyncDepartmentUsecase {
    private readonly departmentService;
    constructor(departmentService: DomainDepartmentService);
    execute(departments: MMSDepartmentResponseDto[]): Promise<void>;
    private syncDepartment;
    private recursiveSyncDepartments;
}
