import { EmployeeService } from '../employee.service';
import { MMSEmployeeResponseDto } from '@resource/application/employee/dtos/mms-employee-response.dto';
export declare class EmployeeWebhookController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    syncEmployees(): Promise<void>;
    webhookCreate(body: MMSEmployeeResponseDto): Promise<void>;
    webhookUpdate(body: MMSEmployeeResponseDto): Promise<void>;
    webhookPositionChanged(body: MMSEmployeeResponseDto): Promise<void>;
    webhookDepartmentChanged(body: MMSEmployeeResponseDto): Promise<void>;
    webhookDelete(body: MMSEmployeeResponseDto): Promise<void>;
}
