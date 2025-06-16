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
exports.CheckSystemAdminUsecase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const employee_service_1 = require("@src/domain/employee/employee.service");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const error_message_1 = require("@libs/constants/error-message");
let CheckSystemAdminUsecase = class CheckSystemAdminUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(email, password) {
        const admin = await this.employeeService.findOne({ where: { email } });
        if (!admin || !admin.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN)) {
            return {
                success: false,
                employee: null,
                message: error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND,
            };
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return {
                success: false,
                employee: null,
                message: error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.INVALID_PASSWORD,
            };
        }
        return {
            success: true,
            employee: admin,
            message: '로그인 성공',
        };
    }
};
exports.CheckSystemAdminUsecase = CheckSystemAdminUsecase;
exports.CheckSystemAdminUsecase = CheckSystemAdminUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], CheckSystemAdminUsecase);
//# sourceMappingURL=system-admin.usecase.js.map