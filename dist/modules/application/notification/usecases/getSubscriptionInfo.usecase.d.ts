import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class GetSubscriptionInfoUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    executeByToken(token: string): Promise<{
        employeeId: any;
        employeeName: any;
        subscriptions: any;
    }>;
    executeByEmployeeId(employeeId: string): Promise<{
        employeeId: any;
        employeeName: any;
        subscriptions: any;
    }>;
}
