"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_ENDPOINTS = exports.NOTIFICATION_SERVICE_URL = void 0;
exports.NOTIFICATION_SERVICE_URL = process.env.FCM_API_URL || 'https://lumir-notification-server-git-fcm-lumir-tech7s-projects.vercel.app/api';
exports.NOTIFICATION_ENDPOINTS = {
    SEND: '/portal/notifications/send',
};
//# sourceMappingURL=notification.constants.js.map