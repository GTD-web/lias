import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
export declare class GetSubscriptionsUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    execute(employeeId: string): Promise<PushSubscriptionDto[]>;
}
