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
exports.SubscribeUsecase = void 0;
const error_message_1 = require("@libs/constants/error-message");
const common_1 = require("@nestjs/common");
const employee_service_1 = require("@src/domain/employee/employee.service");
let SubscribeUsecase = class SubscribeUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.isProduction = process.env.NODE_ENV === 'production';
    }
    async execute(employeeId, subscription) {
        try {
            const employee = await this.employeeService.findByEmployeeId(employeeId);
            if (!employee) {
                throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.EMPLOYEE.NOT_FOUND);
            }
            if (!this.isProduction &&
                employee.subscriptions &&
                Array.isArray(employee.subscriptions) &&
                employee.subscriptions.length > 0) {
                if (employee.subscriptions.length < 2) {
                    employee.subscriptions.push(subscription);
                }
                else {
                    return false;
                }
            }
            else {
                employee.subscriptions = [subscription];
            }
            await this.employeeService.update(employee.employeeId, employee);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
exports.SubscribeUsecase = SubscribeUsecase;
exports.SubscribeUsecase = SubscribeUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], SubscribeUsecase);
//# sourceMappingURL=subscribe.usecase.js.map