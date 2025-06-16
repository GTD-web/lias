import { DomainEmployeeService } from '@src/domain/employee/employee.service';
export declare class ChangePasswordUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employeeId: string, password: string): Promise<void>;
}
