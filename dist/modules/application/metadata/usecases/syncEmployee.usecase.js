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
exports.SyncEmployeeUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../../domain/employee/employee.service");
let SyncEmployeeUsecase = class SyncEmployeeUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(employees) {
        for (const employee of employees) {
            const existingEmployee = await this.employeeService.findOne({
                where: {
                    employeeNumber: employee.employee_number,
                },
            });
            if (employee.status === '퇴사') {
                if (existingEmployee) {
                    await this.employeeService.update(existingEmployee.employeeId, {
                        department: employee.status,
                        position: employee.status,
                        rank: employee.status,
                    });
                }
                continue;
            }
            try {
                if (existingEmployee) {
                    existingEmployee.name = employee.name;
                    existingEmployee.email = employee.email;
                    existingEmployee.employeeNumber = employee.employee_number;
                    existingEmployee.department = employee.department;
                    existingEmployee.position = employee.position;
                    existingEmployee.rank = employee.rank;
                    await this.employeeService.save(existingEmployee);
                }
                else {
                    console.log('create employee', employee);
                    const employeeData = {
                        name: employee.name,
                        email: employee.email,
                        employeeNumber: employee.employee_number,
                        department: employee.department,
                        position: employee.position,
                        rank: employee.rank,
                    };
                    const newEmployee = await this.employeeService.create(employeeData);
                    await this.employeeService.save(newEmployee);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
exports.SyncEmployeeUsecase = SyncEmployeeUsecase;
exports.SyncEmployeeUsecase = SyncEmployeeUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService])
], SyncEmployeeUsecase);
//# sourceMappingURL=syncEmployee.usecase.js.map