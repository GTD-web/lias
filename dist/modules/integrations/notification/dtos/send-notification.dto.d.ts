export declare class RecipientDto {
    employeeNumber: string;
    tokens: string[];
}
export declare class SendNotificationDto {
    sender?: string;
    title: string;
    content: string;
    recipients: RecipientDto[];
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
