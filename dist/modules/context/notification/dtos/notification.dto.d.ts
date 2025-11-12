export declare class SendNotificationDto {
    sender: string;
    title: string;
    content: string;
    recipientEmployeeIds: string[];
    sourceSystem?: string;
    linkUrl?: string;
    metadata?: Record<string, any>;
    authorization?: string;
}
export declare class SendNotificationResponseDto {
    success: boolean;
    message: string;
    notificationIds: string[];
    successCount: number;
    failureCount: number;
}
export declare class SendNotificationToEmployeeDto {
    sender: string;
    title: string;
    content: string;
    recipientEmployeeId: string;
    sourceSystem?: string;
    linkUrl?: string;
    metadata?: Record<string, any>;
    authorization?: string;
}
