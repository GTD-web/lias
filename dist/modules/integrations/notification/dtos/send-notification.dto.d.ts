export declare class SendNotificationDto {
    sender: string;
    title: string;
    content: string;
    recipientIds: string[];
    tokens: string[];
    sourceSystem?: string;
    linkUrl?: string;
    metadata?: Record<string, any>;
}
export declare class SendNotificationResponseDto {
    success: boolean;
    message: string;
    notificationIds: string[];
    successCount: number;
    failureCount: number;
}
