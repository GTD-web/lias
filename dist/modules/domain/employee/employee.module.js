"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_service_1 = require("./employee.service");
const employee_repository_1 = require("./employee.repository");
const entities_1 = require("../../../database/entities");
let DomainEmployeeModule = class DomainEmployeeModule {
};
exports.DomainEmployeeModule = DomainEmployeeModule;
exports.DomainEmployeeModule = DomainEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Employee])],
        providers: [employee_service_1.DomainEmployeeService, employee_repository_1.DomainEmployeeRepository],
        exports: [employee_service_1.DomainEmployeeService],
    })
], DomainEmployeeModule);
//# sourceMappingURL=employee.module.js.map