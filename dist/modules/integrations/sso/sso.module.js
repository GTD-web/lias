"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSOModule = void 0;
const common_1 = require("@nestjs/common");
const sso_sdk_1 = require("@lumir-company/sso-sdk");
const sso_service_1 = require("./sso.service");
const sso_constants_1 = require("./sso.constants");
let SSOModule = class SSOModule {
};
exports.SSOModule = SSOModule;
exports.SSOModule = SSOModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: sso_constants_1.SSO_CLIENT,
                useFactory: async () => {
                    const logger = new common_1.Logger('SSOModule');
                    if (!sso_constants_1.SSO_CONFIG.CLIENT_ID || !sso_constants_1.SSO_CONFIG.CLIENT_SECRET) {
                        logger.warn('SSO_CLIENT_ID 또는 SSO_CLIENT_SECRET가 설정되지 않았습니다.');
                        throw new Error('SSO 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
                    }
                    const client = new sso_sdk_1.SSOClient({
                        baseUrl: sso_constants_1.SSO_CONFIG.BASE_URL,
                        clientId: sso_constants_1.SSO_CONFIG.CLIENT_ID,
                        clientSecret: sso_constants_1.SSO_CONFIG.CLIENT_SECRET,
                        timeoutMs: 10000,
                        retries: 3,
                        enableLogging: process.env.NODE_ENV === 'development',
                    });
                    try {
                        await client.initialize();
                        logger.log(`SSO 클라이언트 초기화 완료: ${client.getSystemName()}`);
                    }
                    catch (error) {
                        logger.error('SSO 시스템 인증 실패', error);
                        throw error;
                    }
                    return client;
                },
            },
            sso_service_1.SSOService,
        ],
        exports: [sso_service_1.SSOService, sso_constants_1.SSO_CLIENT],
    })
], SSOModule);
//# sourceMappingURL=sso.module.js.map