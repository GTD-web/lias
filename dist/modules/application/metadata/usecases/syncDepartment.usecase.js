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
exports.SyncDepartmentUsecase = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("../../../domain/department/department.service");
let SyncDepartmentUsecase = class SyncDepartmentUsecase {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async execute(departments) {
        await this.recursiveSyncDepartments(departments);
    }
    async syncDepartment(department, parentDepartmentId) {
        let existingDepartment = await this.departmentService.findOne({
            where: {
                departmentCode: department.department_code,
            },
        });
        try {
            if (existingDepartment) {
                existingDepartment.departmentName = department.department_name;
                existingDepartment.departmentCode = department.department_code;
                existingDepartment.parentDepartmentId = parentDepartmentId;
                await this.departmentService.save(existingDepartment);
            }
            else {
                console.log('create department', department);
                const newDepartment = await this.departmentService.create({
                    departmentName: department.department_name,
                    departmentCode: department.department_code,
                    parentDepartmentId: parentDepartmentId,
                });
                existingDepartment = await this.departmentService.save(newDepartment);
            }
            return existingDepartment;
        }
        catch (error) {
            console.log(error);
        }
    }
    async recursiveSyncDepartments(departments, parentDepartmentId) {
        for (const department of departments) {
            const syncedDepartment = await this.syncDepartment(department, parentDepartmentId);
            if (department.child_departments && department.child_departments.length > 0) {
                await this.recursiveSyncDepartments(department.child_departments, syncedDepartment.departmentId);
            }
        }
    }
};
exports.SyncDepartmentUsecase = SyncDepartmentUsecase;
exports.SyncDepartmentUsecase = SyncDepartmentUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_service_1.DomainDepartmentService])
], SyncDepartmentUsecase);
//# sourceMappingURL=syncDepartment.usecase.js.map