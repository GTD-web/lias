import { SSOService } from '../../integrations/sso/sso.service';
import { NotificationService } from '../../integrations/notification/notification.service';
import { SendNotificationDto, SendNotificationResponseDto, SendNotificationToEmployeeDto } from './dtos/notification.dto';
import { ApprovalStepType } from '../../../common/enums/approval.enum';
export declare class NotificationContext {
    private readonly ssoService;
    private readonly notificationService;
    private readonly logger;
    constructor(ssoService: SSOService, notificationService: NotificationService);
    sendNotification(dto: SendNotificationDto): Promise<SendNotificationResponseDto>;
    sendNotificationToEmployee(dto: SendNotificationToEmployeeDto): Promise<SendNotificationResponseDto>;
    private validateSendNotificationDto;
    private validateSendNotificationToEmployeeDto;
    getSenderName(employee: {
        name?: string;
        employeeNumber?: string;
    }): string;
    getAuthorizationHeader(accessToken: string): string;
    sendNotificationAfterSubmit(params: {
        document: any;
        allSteps: any[];
        drafterEmployeeNumber: string;
    }): Promise<void>;
    private sendApprovalStepNotifications;
    sendNotificationAfterCompleteAgreement(params: {
        document: any;
        allSteps: any[];
        agreerEmployeeNumber: string;
    }): Promise<void>;
    sendNotificationAfterApprove(params: {
        document: any;
        allSteps: any[];
        currentStepId: string;
        approverEmployeeNumber: string;
    }): Promise<void>;
    sendNotificationAfterReject(params: {
        document: any;
        rejectReason: string;
        rejecterEmployeeNumber: string;
    }): Promise<void>;
    sendNotificationAfterCompleteImplementation(params: {
        document: any;
        allSteps: any[];
        implementerEmployeeNumber: string;
    }): Promise<void>;
    private sendReferenceNotifications;
    private sendDrafterNotification;
    private getDrafterNotificationMessage;
    private findNextPendingStep;
    getStepTypeText(stepType: ApprovalStepType): string;
}
