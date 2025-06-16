import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { CheckPasswordDto } from '@resource/application/employee/dtos/check-password.dto';
import { ChangePasswordDto } from '@resource/application/employee/dtos/change-password.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';
import { EmployeeService } from '../employee.service';
import { Employee } from '@libs/entities';
export declare class UserUserController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findUser(user: Employee): Promise<UserResponseDto>;
    checkPassword(user: Employee, checkPasswordDto: CheckPasswordDto): Promise<boolean>;
    changePassword(user: Employee, changePasswordDto: ChangePasswordDto): Promise<void>;
    changeNotificationSettings(user: Employee, updateDto: UpdateNotificationSettingsDto): Promise<UserResponseDto>;
}
