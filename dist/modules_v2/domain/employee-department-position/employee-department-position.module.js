"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeDepartmentPositionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_department_position_service_1 = require("./employee-department-position.service");
const employee_department_position_repository_1 = require("./employee-department-position.repository");
const employee_department_position_entity_1 = require("./employee-department-position.entity");
let DomainEmployeeDepartmentPositionModule = class DomainEmployeeDepartmentPositionModule {
};
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule;
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_department_position_entity_1.EmployeeDepartmentPosition])],
        providers: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService, employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository],
        exports: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService],
    })
], DomainEmployeeDepartmentPositionModule);
//# sourceMappingURL=employee-department-position.module.js.map