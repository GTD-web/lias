import { MMSEmployeeResponseDto } from '@resource/application/employee/dtos/mms-employee-response.dto';
export declare class GetEmployeeInfoUsecase {
    constructor();
    execute(employeeNumber?: string): Promise<MMSEmployeeResponseDto[]>;
}
