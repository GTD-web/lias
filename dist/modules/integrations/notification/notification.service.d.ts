import { HttpService } from '@nestjs/axios';
import { SendNotificationDto, SendNotificationResponseDto } from './dtos/send-notification.dto';
export declare class NotificationService {
    private readonly httpService;
    private readonly logger;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    private getHeaders;
    sendNotification(dto: SendNotificationDto, authorization?: string): Promise<SendNotificationResponseDto>;
    private validateRequest;
    sendToMultiple(sender: string, title: string, content: string, recipientIds: string[], tokens: string[], options?: {
        sourceSystem?: string;
        linkUrl?: string;
        metadata?: Record<string, any>;
        authorization?: string;
    }): Promise<SendNotificationResponseDto>;
}
