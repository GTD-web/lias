"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSO_CONFIG = exports.SSO_CLIENT = void 0;
exports.SSO_CLIENT = 'SSO_CLIENT';
exports.SSO_CONFIG = {
    BASE_URL: process.env.SSO_API_URL || 'https://lsso.vercel.app',
    CLIENT_ID: process.env.SSO_CLIENT_ID,
    CLIENT_SECRET: process.env.SSO_CLIENT_SECRET,
};
//# sourceMappingURL=sso.constants.js.map