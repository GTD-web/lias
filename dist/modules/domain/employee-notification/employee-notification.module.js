"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeNotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_notification_entity_1 = require("@libs/entities/employee-notification.entity");
const employee_notification_service_1 = require("./employee-notification.service");
const employee_notification_repository_1 = require("./employee-notification.repository");
let DomainEmployeeNotificationModule = class DomainEmployeeNotificationModule {
};
exports.DomainEmployeeNotificationModule = DomainEmployeeNotificationModule;
exports.DomainEmployeeNotificationModule = DomainEmployeeNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_notification_entity_1.EmployeeNotification])],
        providers: [employee_notification_service_1.DomainEmployeeNotificationService, employee_notification_repository_1.DomainEmployeeNotificationRepository],
        exports: [employee_notification_service_1.DomainEmployeeNotificationService],
    })
], DomainEmployeeNotificationModule);
//# sourceMappingURL=employee-notification.module.js.map