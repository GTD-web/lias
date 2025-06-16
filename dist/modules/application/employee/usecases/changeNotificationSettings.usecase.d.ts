import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';
export declare class ChangeNotificationSettingsUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employeeId: string, updateDto: UpdateNotificationSettingsDto): Promise<UserResponseDto>;
}
