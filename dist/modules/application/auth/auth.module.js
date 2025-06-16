"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("@resource/application/auth/strategies/jwt.strategy");
const entities_1 = require("@libs/entities");
const auth_controller_1 = require("./controllers/auth.controller");
const employee_module_1 = require("@src/domain/employee/employee.module");
const auth_service_1 = require("./auth.service");
const validate_usecase_1 = require("./usecases/validate.usecase");
const sso_login_usecase_1 = require("./usecases/sso-login.usecase");
const update_auth_info_usecase_1 = require("./usecases/update-auth-info.usecase");
const system_admin_usecase_1 = require("./usecases/system-admin.usecase");
const get_token_usecase_1 = require("./usecases/get-token.usecase");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, employee_module_1.DomainEmployeeModule, typeorm_1.TypeOrmModule.forFeature([entities_1.Employee])],
        providers: [
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService,
            validate_usecase_1.ValidateUsecase,
            sso_login_usecase_1.SsoLoginUsecase,
            update_auth_info_usecase_1.UpdateAuthInfoUsecase,
            system_admin_usecase_1.CheckSystemAdminUsecase,
            get_token_usecase_1.GetTokenUsecase,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map