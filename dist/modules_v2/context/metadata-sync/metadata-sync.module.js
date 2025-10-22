"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataSyncModule = void 0;
const common_1 = require("@nestjs/common");
const metadata_sync_context_1 = require("./metadata-sync.context");
const position_module_1 = require("../../domain/position/position.module");
const rank_module_1 = require("../../domain/rank/rank.module");
const department_module_1 = require("../../domain/department/department.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
let MetadataSyncModule = class MetadataSyncModule {
};
exports.MetadataSyncModule = MetadataSyncModule;
exports.MetadataSyncModule = MetadataSyncModule = __decorate([
    (0, common_1.Module)({
        imports: [
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            department_module_1.DomainDepartmentModule,
            employee_module_1.DomainEmployeeModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        providers: [metadata_sync_context_1.MetadataSyncContext],
        exports: [metadata_sync_context_1.MetadataSyncContext],
    })
], MetadataSyncModule);
//# sourceMappingURL=metadata-sync.module.js.map