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
exports.FindAllEmployeesByDepartmentUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../../domain/employee/employee.service");
const department_service_1 = require("../../../domain/department/department.service");
const typeorm_1 = require("typeorm");
let FindAllEmployeesByDepartmentUsecase = class FindAllEmployeesByDepartmentUsecase {
    constructor(employeeService, departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
    }
    async execute() {
        const departments = await this.departmentService.findAll({
            where: {
                parentDepartment: (0, typeorm_1.IsNull)(),
            },
            relations: ['childDepartments', 'childDepartments.childDepartments'],
            order: {
                order: 'ASC',
                childDepartments: {
                    order: 'ASC',
                },
            },
        });
        const employees = await this.employeeService.findAll({
            relations: [
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                'currentRank',
            ],
        });
        const metadata = this.buildDepartmentTree(departments, employees);
        return metadata[0];
    }
    buildDepartmentTree(departments, employees) {
        return departments.map((department) => {
            const departmentEmployees = employees.filter((employee) => {
                if (employee.departmentPositions && employee.departmentPositions.length > 0) {
                    return employee.departmentPositions.some((dp) => dp.departmentId === department.id);
                }
            });
            const childrenDepartments = department.childDepartments && department.childDepartments.length > 0
                ? this.buildDepartmentTree(department.childDepartments, employees)
                : [];
            const departmentDto = this.convertDepartmentToDto(department, childrenDepartments);
            const employeeDtos = this.sortEmployees(departmentEmployees, department.id);
            return {
                department: departmentDto,
                employees: employeeDtos,
            };
        });
    }
    convertDepartmentToDto(department, childrenDepartments) {
        return {
            departmentId: department.id,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            childrenDepartments: childrenDepartments.map((meta) => meta.department),
        };
    }
    sortEmployees(employees, departmentId) {
        return employees
            .map((employee) => {
            const deptPosition = employee.departmentPositions?.find((dp) => dp.departmentId === departmentId);
            return {
                employeeId: employee.id,
                name: employee.name,
                email: employee.email,
                employeeNumber: employee.employeeNumber,
                positionLevel: deptPosition?.position?.level || 999,
                rankLevel: employee.currentRank?.level || 999,
            };
        })
            .sort((a, b) => {
            if (a.positionLevel !== b.positionLevel) {
                return a.positionLevel - b.positionLevel;
            }
            if (a.rankLevel !== b.rankLevel) {
                return a.rankLevel - b.rankLevel;
            }
            if (a.employeeNumber !== b.employeeNumber) {
                return a.employeeNumber.localeCompare(b.employeeNumber);
            }
            return a.name.localeCompare(b.name);
        })
            .map(({ positionLevel, rankLevel, ...employee }) => employee);
    }
};
exports.FindAllEmployeesByDepartmentUsecase = FindAllEmployeesByDepartmentUsecase;
exports.FindAllEmployeesByDepartmentUsecase = FindAllEmployeesByDepartmentUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService])
], FindAllEmployeesByDepartmentUsecase);
//# sourceMappingURL=findAllEmployeesByDepartment.usecase.js.map