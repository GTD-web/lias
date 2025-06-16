import { EmployeeNotification } from './employee-notification.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { ResourceManager } from './resource-manager.entity';
import { Role } from '@libs/enums/role-type.enum';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
export declare class Employee {
    employeeId: string;
    name: string;
    employeeNumber: string;
    department: string;
    position: string;
    email: string;
    mobile: string;
    password: string;
    accessToken: string;
    expiredAt: string;
    subscriptions: PushSubscriptionDto[];
    isPushNotificationEnabled: boolean;
    roles: Role[];
    participants: ReservationParticipant[];
    notifications: EmployeeNotification[];
    resourceManagers: ResourceManager[];
}
