export declare class FCMDto {
    token: string;
}
export declare class WebPushDto {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    };
}
export declare class PushSubscriptionDto {
    fcm: FCMDto;
    webPush: WebPushDto;
}
