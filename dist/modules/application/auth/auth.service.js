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
const validate_usecase_1 = require("./usecases/validate.usecase");
const sso_login_usecase_1 = require("./usecases/sso-login.usecase");
const update_auth_info_usecase_1 = require("./usecases/update-auth-info.usecase");
const system_admin_usecase_1 = require("./usecases/system-admin.usecase");
const get_token_usecase_1 = require("./usecases/get-token.usecase");
let AuthService = class AuthService {
    constructor(validateUsecase, ssoLoginUsecase, updateAuthInfoUsecase, checkSystemAdminUsecase, getTokenUsecase) {
        this.validateUsecase = validateUsecase;
        this.ssoLoginUsecase = ssoLoginUsecase;
        this.updateAuthInfoUsecase = updateAuthInfoUsecase;
        this.checkSystemAdminUsecase = checkSystemAdminUsecase;
        this.getTokenUsecase = getTokenUsecase;
    }
    async login(loginDto) {
        const systemAdminResult = await this.checkSystemAdminUsecase.execute(loginDto.email, loginDto.password);
        if (systemAdminResult.success) {
            return await this.getTokenUsecase.execute(systemAdminResult.employee);
        }
        const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
        const updatedEmployee = await this.updateAuthInfoUsecase.execute(ssoResponse);
        return {
            accessToken: updatedEmployee.accessToken,
            email: updatedEmployee.email,
            name: updatedEmployee.name,
            department: updatedEmployee.department,
            position: updatedEmployee.position,
            roles: updatedEmployee.roles,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validate_usecase_1.ValidateUsecase,
        sso_login_usecase_1.SsoLoginUsecase,
        update_auth_info_usecase_1.UpdateAuthInfoUsecase,
        system_admin_usecase_1.CheckSystemAdminUsecase,
        get_token_usecase_1.GetTokenUsecase])
], AuthService);
//# sourceMappingURL=auth.service.js.map