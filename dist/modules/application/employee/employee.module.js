"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const webhook_controller_1 = require("./controllers/webhook.controller");
const employee_service_1 = require("./employee.service");
const admin_resource_manager_controller_1 = require("./controllers/admin.resource-manager.controller");
const employee_module_1 = require("@src/domain/employee/employee.module");
const usecases_1 = require("./usecases");
const admin_user_controller_1 = require("./controllers/admin.user.controller");
const employee_controller_1 = require("./controllers/employee.controller");
const user_controller_1 = require("./controllers/user.controller");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [employee_module_1.DomainEmployeeModule, typeorm_1.TypeOrmModule.forFeature([entities_1.Employee])],
        controllers: [
            webhook_controller_1.EmployeeWebhookController,
            admin_resource_manager_controller_1.AdminResourceManagerController,
            admin_user_controller_1.AdminUserController,
            employee_controller_1.UserEmployeeController,
            user_controller_1.UserUserController,
        ],
        providers: [
            employee_service_1.EmployeeService,
            usecases_1.GetEmployeeInfoUsecase,
            usecases_1.SyncEmployeeUsecase,
            usecases_1.GetResourceManagersUsecase,
            usecases_1.GetEmployeeListUsecase,
            usecases_1.GetManagerCandidatesUsecase,
            usecases_1.ChangeRoleUsecase,
            usecases_1.GetEmployeeDetailUsecase,
            usecases_1.CheckPasswordUsecase,
            usecases_1.ChangePasswordUsecase,
            usecases_1.ChangeNotificationSettingsUsecase,
        ],
        exports: [employee_service_1.EmployeeService],
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map