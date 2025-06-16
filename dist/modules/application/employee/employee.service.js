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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const usecases_1 = require("./usecases");
let EmployeeService = class EmployeeService {
    constructor(getEmployeeInfoUsecase, syncEmployeeUsecase, getResourceManagersUsecase, getEmployeeListUsecase, getManagerCandidatesUsecase, changeRoleUsecase, getEmployeeDetailUsecase, checkPasswordUsecase, changePasswordUsecase, changeNotificationSettingsUsecase) {
        this.getEmployeeInfoUsecase = getEmployeeInfoUsecase;
        this.syncEmployeeUsecase = syncEmployeeUsecase;
        this.getResourceManagersUsecase = getResourceManagersUsecase;
        this.getEmployeeListUsecase = getEmployeeListUsecase;
        this.getManagerCandidatesUsecase = getManagerCandidatesUsecase;
        this.changeRoleUsecase = changeRoleUsecase;
        this.getEmployeeDetailUsecase = getEmployeeDetailUsecase;
        this.checkPasswordUsecase = checkPasswordUsecase;
        this.changePasswordUsecase = changePasswordUsecase;
        this.changeNotificationSettingsUsecase = changeNotificationSettingsUsecase;
    }
    async syncEmployees(employeeNumber) {
        const employees = await this.getEmployeeInfoUsecase.execute(employeeNumber);
        await this.syncEmployeeUsecase.execute(employees);
    }
    async findResourceManagers() {
        return this.getResourceManagersUsecase.execute();
    }
    async findEmployeeList() {
        return this.getEmployeeListUsecase.execute();
    }
    async findManagerCandidates() {
        return this.getManagerCandidatesUsecase.execute();
    }
    async changeRole(changeRoleDto) {
        await this.changeRoleUsecase.execute(changeRoleDto);
    }
    async findEmployeeDetail(employeeId) {
        return this.getEmployeeDetailUsecase.execute(employeeId);
    }
    async checkPassword(employeeId, password) {
        return this.checkPasswordUsecase.execute(employeeId, password);
    }
    async changePassword(employeeId, password) {
        return this.changePasswordUsecase.execute(employeeId, password);
    }
    async changeNotificationSettings(employeeId, updateDto) {
        return this.changeNotificationSettingsUsecase.execute(employeeId, updateDto);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usecases_1.GetEmployeeInfoUsecase,
        usecases_1.SyncEmployeeUsecase,
        usecases_1.GetResourceManagersUsecase,
        usecases_1.GetEmployeeListUsecase,
        usecases_1.GetManagerCandidatesUsecase,
        usecases_1.ChangeRoleUsecase,
        usecases_1.GetEmployeeDetailUsecase,
        usecases_1.CheckPasswordUsecase,
        usecases_1.ChangePasswordUsecase,
        usecases_1.ChangeNotificationSettingsUsecase])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map