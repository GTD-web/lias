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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const employee_notification_entity_1 = require("./employee-notification.entity");
const reservation_participant_entity_1 = require("./reservation-participant.entity");
const resource_manager_entity_1 = require("./resource-manager.entity");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '웹푸시 알림 관련 구독 정보 배열' }),
    __metadata("design:type", Array)
], Employee.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, comment: '웹푸시 알림 설정 여부' }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isPushNotificationEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_type_enum_1.Role, array: true, default: [role_type_enum_1.Role.USER], comment: '사용자 역할' }),
    __metadata("design:type", Array)
], Employee.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_participant_entity_1.ReservationParticipant, (participant) => participant.employee),
    __metadata("design:type", Array)
], Employee.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_notification_entity_1.EmployeeNotification, (notification) => notification.employee),
    __metadata("design:type", Array)
], Employee.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_manager_entity_1.ResourceManager, (resourceManager) => resourceManager.employee),
    __metadata("design:type", Array)
], Employee.prototype, "resourceManagers", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map