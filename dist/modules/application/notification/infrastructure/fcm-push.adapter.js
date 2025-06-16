"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCMAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
let FCMAdapter = class FCMAdapter {
    constructor(configService) {
        this.configService = configService;
        this.isProduction = process.env.NODE_ENV === 'production';
        try {
            (0, app_1.initializeApp)({
                credential: (0, app_1.cert)({
                    clientEmail: this.configService.get('firebase.clientEmail'),
                    privateKey: this.configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
                    projectId: this.configService.get('firebase.projectId'),
                }),
            });
            console.log('Firebase Admin initialized successfully');
        }
        catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
        process.on('unhandledRejection', (reason, promise) => {
            console.error('🧨 Unhandled Rejection:', reason);
        });
    }
    async sendNotification(subscription, payload) {
        try {
            if (!subscription || !subscription.fcm || !subscription.fcm.token) {
                throw new common_1.BadRequestException('FCM token is missing');
            }
            const message = {
                token: subscription.fcm.token,
                notification: {
                    title: payload.title,
                    body: payload.body,
                },
                data: {
                    title: payload.title,
                    body: payload.body,
                },
            };
            const response = await (0, messaging_1.getMessaging)()
                .send(message)
                .then((response) => {
                console.log('FCM send successful. Message ID:', response);
                return { success: true, message: response, error: null };
            })
                .catch((error) => {
                console.error('FCM send error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    stack: error.stack,
                });
                return { success: false, message: 'failed', error: error.message };
            });
            return response;
        }
        catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { success: false, message: 'failed', error: error.message };
        }
    }
    async sendBulkNotification(subscriptions, payload) {
        try {
            const tokens = subscriptions.map((subscription) => subscription.fcm.token);
            console.log('알림 전송 - tokens', tokens);
            console.log('알림 전송 - payload', payload);
            const response = await (0, messaging_1.getMessaging)()
                .sendEachForMulticast({
                tokens: tokens,
                data: {
                    title: this.isProduction ? payload.title : '[개발]' + payload.title,
                    body: payload.body,
                    notificationData: JSON.stringify(payload.notificationData),
                    notificationType: payload.notificationType,
                },
                android: {
                    priority: 'high',
                },
            })
                .then((response) => {
                console.log('FCM send successful.', response);
                return response;
            });
            return response;
        }
        catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { responses: [], successCount: -1, failureCount: -1 };
        }
    }
    async sendTestNotification(subscription, payload) {
        try {
            const message = {
                token: subscription.fcm.token,
                ...payload,
            };
            const response = await (0, messaging_1.getMessaging)()
                .send(message)
                .then((response) => {
                console.log('FCM send successful. Message ID:', response);
                return { success: true, message: response, error: null };
            })
                .catch((error) => {
                console.error('FCM send error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    stack: error.stack,
                });
                return { success: false, message: 'failed', error: error.message };
            });
            return response;
        }
        catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { success: false, message: 'failed', error: error.message };
        }
    }
};
exports.FCMAdapter = FCMAdapter;
exports.FCMAdapter = FCMAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FCMAdapter);
//# sourceMappingURL=fcm-push.adapter.js.map