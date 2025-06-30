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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sso_login_usecase_1 = require("./usecases/sso-login.usecase");
const update_auth_info_usecase_1 = require("./usecases/update-auth-info.usecase");
const find_me_usecase_1 = require("./usecases/find-me.usecase");
let AuthService = class AuthService {
    constructor(ssoLoginUsecase, updateAuthInfoUsecase, findMeUsecase) {
        this.ssoLoginUsecase = ssoLoginUsecase;
        this.updateAuthInfoUsecase = updateAuthInfoUsecase;
        this.findMeUsecase = findMeUsecase;
    }
    async login(loginDto) {
        const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
        const updatedEmployee = await this.updateAuthInfoUsecase.execute(ssoResponse);
        return {
            accessToken: updatedEmployee.accessToken,
            email: updatedEmployee.email,
            name: updatedEmployee.name,
            department: updatedEmployee.department,
            position: updatedEmployee.position,
            rank: updatedEmployee.rank,
            roles: updatedEmployee.roles,
        };
    }
    async me(user) {
        return await this.findMeUsecase.execute(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sso_login_usecase_1.SsoLoginUsecase,
        update_auth_info_usecase_1.UpdateAuthInfoUsecase,
        find_me_usecase_1.FindMeUsecase])
], AuthService);
//# sourceMappingURL=auth.service.js.map