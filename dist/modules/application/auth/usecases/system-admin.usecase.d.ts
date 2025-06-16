import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class CheckSystemAdminUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(email: string, password: string): Promise<{
        success: boolean;
        employee: any;
        message: any;
    } | {
        success: boolean;
        employee: any;
        message: string;
    }>;
}
