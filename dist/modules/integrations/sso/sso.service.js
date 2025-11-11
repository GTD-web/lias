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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SSOService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSOService = void 0;
const common_1 = require("@nestjs/common");
const sso_sdk_1 = require("@lumir-company/sso-sdk");
const sso_constants_1 = require("./sso.constants");
let SSOService = SSOService_1 = class SSOService {
    constructor(ssoClient) {
        this.ssoClient = ssoClient;
        this.logger = new common_1.Logger(SSOService_1.name);
    }
    async onModuleInit() {
        const systemName = this.ssoClient.getSystemName();
        this.logger.log(`SSO 서비스 초기화 완료. 시스템명: ${systemName}`);
    }
    async login(email, password) {
        this.logger.debug(`로그인 시도: ${email}`);
        try {
            const result = await this.ssoClient.sso.login(email, password);
            this.logger.log(`로그인 성공: ${email} (${result.employeeNumber})`);
            return result;
        }
        catch (error) {
            this.logger.error(`로그인 실패: ${email}`, error);
            throw error;
        }
    }
    async verifyToken(token) {
        try {
            return await this.ssoClient.sso.verifyToken(token);
        }
        catch (error) {
            this.logger.error('토큰 검증 실패', error);
            throw error;
        }
    }
    async refreshToken(refreshToken) {
        try {
            return await this.ssoClient.sso.refreshToken(refreshToken);
        }
        catch (error) {
            this.logger.error('토큰 갱신 실패', error);
            throw error;
        }
    }
    async checkPassword(token, currentPassword, email) {
        try {
            const result = await this.ssoClient.sso.checkPassword(token, currentPassword, email);
            return result.isValid;
        }
        catch (error) {
            this.logger.error('비밀번호 확인 실패', error);
            throw error;
        }
    }
    async changePassword(token, newPassword) {
        try {
            await this.ssoClient.sso.changePassword(token, newPassword);
            this.logger.log('비밀번호 변경 성공');
        }
        catch (error) {
            this.logger.error('비밀번호 변경 실패', error);
            throw error;
        }
    }
    async getEmployee(params) {
        try {
            return await this.ssoClient.organization.getEmployee(params);
        }
        catch (error) {
            this.logger.error('직원 정보 조회 실패', error);
            throw error;
        }
    }
    async getEmployees(params) {
        try {
            return await this.ssoClient.organization.getEmployees(params);
        }
        catch (error) {
            this.logger.error('직원 목록 조회 실패', error);
            throw error;
        }
    }
    async getDepartmentHierarchy(params) {
        try {
            return await this.ssoClient.organization.getDepartmentHierarchy(params);
        }
        catch (error) {
            this.logger.error('부서 계층구조 조회 실패', error);
            throw error;
        }
    }
    async getEmployeesManagers() {
        try {
            return await this.ssoClient.organization.getEmployeesManagers();
        }
        catch (error) {
            this.logger.error('매니저 정보 조회 실패', error);
            throw error;
        }
    }
    async subscribeFcm(params) {
        try {
            return await this.ssoClient.fcm.subscribe(params);
        }
        catch (error) {
            this.logger.error('FCM 토큰 구독 실패', error);
            throw error;
        }
    }
    async getFcmToken(params) {
        try {
            return await this.ssoClient.fcm.getToken(params);
        }
        catch (error) {
            this.logger.error('FCM 토큰 조회 실패', error);
            throw error;
        }
    }
    async getMultipleFcmTokens(params) {
        try {
            return await this.ssoClient.fcm.getMultipleTokens(params);
        }
        catch (error) {
            this.logger.error('다중 FCM 토큰 조회 실패', error);
            throw error;
        }
    }
    async unsubscribeFcm(params) {
        try {
            return await this.ssoClient.fcm.unsubscribe(params);
        }
        catch (error) {
            this.logger.error('FCM 토큰 구독 해지 실패', error);
            throw error;
        }
    }
};
exports.SSOService = SSOService;
exports.SSOService = SSOService = SSOService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sso_constants_1.SSO_CLIENT)),
    __metadata("design:paramtypes", [sso_sdk_1.SSOClient])
], SSOService);
//# sourceMappingURL=sso.service.js.map