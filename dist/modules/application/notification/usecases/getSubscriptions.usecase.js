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
exports.GetSubscriptionsUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("@src/domain/employee/employee.service");
let GetSubscriptionsUsecase = class GetSubscriptionsUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(employeeId) {
        const employee = await this.employeeService.findOne({
            where: { employeeId },
            select: { subscriptions: true, isPushNotificationEnabled: true },
        });
        if (!employee ||
            !employee.subscriptions ||
            employee.subscriptions.length === 0 ||
            !employee.isPushNotificationEnabled) {
            return [];
        }
        return employee.subscriptions;
    }
};
exports.GetSubscriptionsUsecase = GetSubscriptionsUsecase;
exports.GetSubscriptionsUsecase = GetSubscriptionsUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], GetSubscriptionsUsecase);
//# sourceMappingURL=getSubscriptions.usecase.js.map