import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
export declare class SubscribeUsecase {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService);
    isProduction: boolean;
    execute(employeeId: string, subscription: PushSubscriptionDto): Promise<boolean>;
}
