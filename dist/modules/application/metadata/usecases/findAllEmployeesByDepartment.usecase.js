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
            relations: ['childrenDepartments', 'childrenDepartments.childrenDepartments'],
        });
        const employees = await this.employeeService.findAll({
            select: {
                employeeId: true,
                name: true,
                email: true,
                employeeNumber: true,
                position: true,
                department: true,
                rank: true,
            },
        });
        const metadata = this.buildDepartmentTree(departments, employees);
        return metadata[0];
    }
    buildDepartmentTree(departments, employees) {
        return departments.map((department) => {
            const departmentEmployees = employees.filter((employee) => employee.department === department.departmentCode);
            const childrenDepartments = department.childrenDepartments && department.childrenDepartments.length > 0
                ? this.buildDepartmentTree(department.childrenDepartments, employees)
                : [];
            department.childrenDepartments = childrenDepartments;
            return {
                department,
                employees: this.sortEmployees(departmentEmployees),
            };
        });
    }
    sortEmployees(employees) {
        return employees.sort((a, b) => {
            const positionOrder = ['임원', '실장', 'PM', '파트장', '직원'];
            const aPositionIndex = positionOrder.indexOf(a.position);
            const bPositionIndex = positionOrder.indexOf(b.position);
            if (aPositionIndex !== bPositionIndex) {
                return aPositionIndex - bPositionIndex;
            }
            const rankOrder = [
                '사장',
                '부사장',
                '전무이사',
                '상무이사',
                '이사',
                '전문위원',
                '책임연구원',
                '책임매니저',
                '책임제조원',
                '선임매니저',
                '선임연구원',
                '선임제조원',
                '매니저',
                '연구원',
                '제조원',
            ];
            const aRankIndex = rankOrder.indexOf(a.rank);
            const bRankIndex = rankOrder.indexOf(b.rank);
            if (aRankIndex !== bRankIndex) {
                return aRankIndex - bRankIndex;
            }
            if (a.employeeNumber !== b.employeeNumber) {
                return a.employeeNumber.localeCompare(b.employeeNumber);
            }
            return a.name.localeCompare(b.name);
        });
    }
};
exports.FindAllEmployeesByDepartmentUsecase = FindAllEmployeesByDepartmentUsecase;
exports.FindAllEmployeesByDepartmentUsecase = FindAllEmployeesByDepartmentUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService])
], FindAllEmployeesByDepartmentUsecase);
//# sourceMappingURL=findAllEmployeesByDepartment.usecase.js.map