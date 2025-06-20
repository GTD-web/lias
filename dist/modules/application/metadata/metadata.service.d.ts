import { GetEmployeeInfoUsecase } from './usecases/getEmployeeInfo.usecase';
import { SyncEmployeeUsecase } from './usecases/syncEmployee.usecase';
import { GetDepartmentInfoUsecase } from './usecases/getDepartmentInfo.usecase';
import { SyncDepartmentUsecase } from './usecases/syncDepartment.usecase';
import { MetadataResponseDto } from './dtos/metadata-response.dto';
import { FindAllEmployeesByDepartmentUsecase } from './usecases/findAllEmployeesByDepartment.usecase';
export declare class MetadataService {
    private readonly getEmployeeInfoUsecase;
    private readonly syncEmployeeUsecase;
    private readonly getDepartmentInfoUsecase;
    private readonly syncDepartmentUsecase;
    private readonly findAllEmployeesByDepartmentUsecase;
    constructor(getEmployeeInfoUsecase: GetEmployeeInfoUsecase, syncEmployeeUsecase: SyncEmployeeUsecase, getDepartmentInfoUsecase: GetDepartmentInfoUsecase, syncDepartmentUsecase: SyncDepartmentUsecase, findAllEmployeesByDepartmentUsecase: FindAllEmployeesByDepartmentUsecase);
    syncEmployees(employeeNumber?: string): Promise<void>;
    syncDepartments(): Promise<void>;
    findAllEmplyeesByDepartment(): Promise<MetadataResponseDto>;
}
