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
exports.SsoLoginUsecase = void 0;
const common_1 = require("@nestjs/common");
const error_message_1 = require("../../../../common/constants/error-message");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
let SsoLoginUsecase = class SsoLoginUsecase {
    constructor() { }
    async execute(email, password) {
        try {
            const client_id = process.env.SSO_CLIENT_ID;
            const client_secret = process.env.SSO_CLIENT_SECRET;
            const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios_1.default.post(`${ssoApiUrl}/api/auth/login`, {
                grant_type: 'password',
                email: email,
                password: password,
            }, {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                },
            });
            const data = response.data;
            data.password = bcrypt.hashSync(password, 10);
            return data;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }
};
exports.SsoLoginUsecase = SsoLoginUsecase;
exports.SsoLoginUsecase = SsoLoginUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SsoLoginUsecase);
//# sourceMappingURL=sso-login.usecase.js.map