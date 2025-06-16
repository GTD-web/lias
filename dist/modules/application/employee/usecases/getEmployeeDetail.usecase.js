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
exports.GetEmployeeDetailUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("@src/domain/employee/employee.service");
const error_message_1 = require("@libs/constants/error-message");
let GetEmployeeDetailUsecase = class GetEmployeeDetailUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(employeeId) {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        return {
            employeeId: employee.employeeId,
            email: employee.email,
            mobile: employee.mobile,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            roles: employee.roles,
            isPushNotificationEnabled: employee.isPushNotificationEnabled,
        };
    }
};
exports.GetEmployeeDetailUsecase = GetEmployeeDetailUsecase;
exports.GetEmployeeDetailUsecase = GetEmployeeDetailUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], GetEmployeeDetailUsecase);
//# sourceMappingURL=getEmployeeDetail.usecase.js.map