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
exports.MetadataService = void 0;
const common_1 = require("@nestjs/common");
const getEmployeeInfo_usecase_1 = require("./usecases/getEmployeeInfo.usecase");
const syncEmployee_usecase_1 = require("./usecases/syncEmployee.usecase");
const getDepartmentInfo_usecase_1 = require("./usecases/getDepartmentInfo.usecase");
const syncDepartment_usecase_1 = require("./usecases/syncDepartment.usecase");
const findAllEmployeesByDepartment_usecase_1 = require("./usecases/findAllEmployeesByDepartment.usecase");
let MetadataService = class MetadataService {
    constructor(getEmployeeInfoUsecase, syncEmployeeUsecase, getDepartmentInfoUsecase, syncDepartmentUsecase, findAllEmployeesByDepartmentUsecase) {
        this.getEmployeeInfoUsecase = getEmployeeInfoUsecase;
        this.syncEmployeeUsecase = syncEmployeeUsecase;
        this.getDepartmentInfoUsecase = getDepartmentInfoUsecase;
        this.syncDepartmentUsecase = syncDepartmentUsecase;
        this.findAllEmployeesByDepartmentUsecase = findAllEmployeesByDepartmentUsecase;
    }
    async syncEmployees(employeeNumber) {
        const employees = await this.getEmployeeInfoUsecase.execute(employeeNumber);
        await this.syncEmployeeUsecase.execute(employees);
    }
    async syncDepartments() {
        const departments = await this.getDepartmentInfoUsecase.execute();
        await this.syncDepartmentUsecase.execute(departments);
    }
    async findAllEmplyeesByDepartment() {
        return this.findAllEmployeesByDepartmentUsecase.execute();
    }
};
exports.MetadataService = MetadataService;
exports.MetadataService = MetadataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [getEmployeeInfo_usecase_1.GetEmployeeInfoUsecase,
        syncEmployee_usecase_1.SyncEmployeeUsecase,
        getDepartmentInfo_usecase_1.GetDepartmentInfoUsecase,
        syncDepartment_usecase_1.SyncDepartmentUsecase,
        findAllEmployeesByDepartment_usecase_1.FindAllEmployeesByDepartmentUsecase])
], MetadataService);
//# sourceMappingURL=metadata.service.js.map