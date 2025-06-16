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
exports.ValidateUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("@src/domain/employee/employee.service");
const error_message_1 = require("@libs/constants/error-message");
const bcrypt = require("bcrypt");
const date_util_1 = require("@libs/utils/date.util");
let ValidateUsecase = class ValidateUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(email, password) {
        const employee = await this.employeeService.findByEmail(email);
        if (!employee) {
            throw new common_1.UnauthorizedException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        if (employee.position === '퇴사') {
            throw new common_1.UnauthorizedException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        if (!employee.accessToken ||
            !employee.password ||
            (employee.expiredAt && date_util_1.DateUtil.now().format() > employee.expiredAt)) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            console.log('패스워드 불일치, SSO 비밀번호 확인 필요');
            return null;
        }
        return employee;
    }
};
exports.ValidateUsecase = ValidateUsecase;
exports.ValidateUsecase = ValidateUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], ValidateUsecase);
//# sourceMappingURL=validate.usecase.js.map