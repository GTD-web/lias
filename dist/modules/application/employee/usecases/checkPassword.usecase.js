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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPasswordUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("@src/domain/employee/employee.service");
const error_message_1 = require("@libs/constants/error-message");
const axios_1 = require("axios");
let CheckPasswordUsecase = class CheckPasswordUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(employeeId, password) {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        try {
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios_1.default.post(`${ssoApiUrl}/api/auth/check-password`, {
                currentPassword: password,
            }, {
                headers: {
                    Authorization: `Bearer ${employee.accessToken}`,
                },
            });
            const data = response.data;
            return data.isValid;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }
};
exports.CheckPasswordUsecase = CheckPasswordUsecase;
exports.CheckPasswordUsecase = CheckPasswordUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], CheckPasswordUsecase);
//# sourceMappingURL=checkPassword.usecase.js.map