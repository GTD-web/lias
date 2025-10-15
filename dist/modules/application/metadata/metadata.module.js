"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataModule = void 0;
const common_1 = require("@nestjs/common");
const metadata_service_1 = require("./metadata.service");
const metadata_controller_1 = require("./controllers/metadata.controller");
const webhook_controller_1 = require("./controllers/webhook.controller");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
const position_module_1 = require("../../domain/position/position.module");
const rank_module_1 = require("../../domain/rank/rank.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
const usecases = require("./usecases");
let MetadataModule = class MetadataModule {
    configure(consumer) {
        consumer.apply().forRoutes({
            path: 'metadata',
            method: common_1.RequestMethod.ALL,
        });
    }
};
exports.MetadataModule = MetadataModule;
exports.MetadataModule = MetadataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        controllers: [metadata_controller_1.MetadataController, webhook_controller_1.MetadataWebhookController],
        providers: [metadata_service_1.MetadataService, ...Object.values(usecases)],
        exports: [metadata_service_1.MetadataService],
    })
], MetadataModule);
//# sourceMappingURL=metadata.module.js.map