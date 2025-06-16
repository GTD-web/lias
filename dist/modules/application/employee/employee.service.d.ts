import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';
import { GetResourceManagersUsecase, GetEmployeeInfoUsecase, SyncEmployeeUsecase, GetEmployeeListUsecase, GetManagerCandidatesUsecase, ChangeRoleUsecase, GetEmployeeDetailUsecase, CheckPasswordUsecase, ChangePasswordUsecase, ChangeNotificationSettingsUsecase } from './usecases';
export declare class EmployeeService {
    private readonly getEmployeeInfoUsecase;
    private readonly syncEmployeeUsecase;
    private readonly getResourceManagersUsecase;
    private readonly getEmployeeListUsecase;
    private readonly getManagerCandidatesUsecase;
    private readonly changeRoleUsecase;
    private readonly getEmployeeDetailUsecase;
    private readonly checkPasswordUsecase;
    private readonly changePasswordUsecase;
    private readonly changeNotificationSettingsUsecase;
    constructor(getEmployeeInfoUsecase: GetEmployeeInfoUsecase, syncEmployeeUsecase: SyncEmployeeUsecase, getResourceManagersUsecase: GetResourceManagersUsecase, getEmployeeListUsecase: GetEmployeeListUsecase, getManagerCandidatesUsecase: GetManagerCandidatesUsecase, changeRoleUsecase: ChangeRoleUsecase, getEmployeeDetailUsecase: GetEmployeeDetailUsecase, checkPasswordUsecase: CheckPasswordUsecase, changePasswordUsecase: ChangePasswordUsecase, changeNotificationSettingsUsecase: ChangeNotificationSettingsUsecase);
    syncEmployees(employeeNumber?: string): Promise<void>;
    findResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]>;
    findEmployeeList(): Promise<EmplyeesByDepartmentResponseDto[]>;
    findManagerCandidates(): Promise<EmplyeesByDepartmentResponseDto[]>;
    changeRole(changeRoleDto: ChangeRoleDto): Promise<void>;
    findEmployeeDetail(employeeId: string): Promise<UserResponseDto>;
    checkPassword(employeeId: string, password: string): Promise<boolean>;
    changePassword(employeeId: string, password: string): Promise<void>;
    changeNotificationSettings(employeeId: string, updateDto: UpdateNotificationSettingsDto): Promise<UserResponseDto>;
}
