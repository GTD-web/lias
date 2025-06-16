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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeWebhookController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../employee.service");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("@libs/decorators/public.decorator");
const throttler_decorator_1 = require("@nestjs/throttler/dist/throttler.decorator");
const mms_employee_response_dto_1 = require("@resource/application/employee/dtos/mms-employee-response.dto");
let EmployeeWebhookController = class EmployeeWebhookController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async syncEmployees() {
        return await this.employeeService.syncEmployees();
    }
    async webhookCreate(body) {
        console.log('created employee', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }
    async webhookUpdate(body) {
        console.log('updated employee', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }
    async webhookPositionChanged(body) {
        console.log('position changed', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }
    async webhookDepartmentChanged(body) {
        console.log('department changed', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }
    async webhookDelete(body) {
        console.log('deleted employee', body);
    }
};
exports.EmployeeWebhookController = EmployeeWebhookController;
__decorate([
    (0, common_1.Get)('sync'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "syncEmployees", null);
__decorate([
    (0, common_1.Post)('webhook/create'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, throttler_decorator_1.Throttle)(5, 60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof mms_employee_response_dto_1.MMSEmployeeResponseDto !== "undefined" && mms_employee_response_dto_1.MMSEmployeeResponseDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "webhookCreate", null);
__decorate([
    (0, common_1.Post)('webhook/update'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, throttler_decorator_1.Throttle)(5, 60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof mms_employee_response_dto_1.MMSEmployeeResponseDto !== "undefined" && mms_employee_response_dto_1.MMSEmployeeResponseDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "webhookUpdate", null);
__decorate([
    (0, common_1.Post)('webhook/position_changed'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, throttler_decorator_1.Throttle)(5, 60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof mms_employee_response_dto_1.MMSEmployeeResponseDto !== "undefined" && mms_employee_response_dto_1.MMSEmployeeResponseDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "webhookPositionChanged", null);
__decorate([
    (0, common_1.Post)('webhook/department_changed'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, throttler_decorator_1.Throttle)(5, 60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof mms_employee_response_dto_1.MMSEmployeeResponseDto !== "undefined" && mms_employee_response_dto_1.MMSEmployeeResponseDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "webhookDepartmentChanged", null);
__decorate([
    (0, common_1.Post)('webhook/delete'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, public_decorator_1.Public)(),
    (0, throttler_decorator_1.Throttle)(5, 60),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof mms_employee_response_dto_1.MMSEmployeeResponseDto !== "undefined" && mms_employee_response_dto_1.MMSEmployeeResponseDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], EmployeeWebhookController.prototype, "webhookDelete", null);
exports.EmployeeWebhookController = EmployeeWebhookController = __decorate([
    (0, swagger_1.ApiTags)('5. 직원 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('v1/employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeWebhookController);
//# sourceMappingURL=webhook.controller.js.map