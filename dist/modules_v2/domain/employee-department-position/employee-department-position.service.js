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
exports.DomainEmployeeDepartmentPositionService = void 0;
const common_1 = require("@nestjs/common");
const employee_department_position_repository_1 = require("./employee-department-position.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainEmployeeDepartmentPositionService = class DomainEmployeeDepartmentPositionService extends base_service_1.BaseService {
    constructor(employeeDepartmentPositionRepository) {
        super(employeeDepartmentPositionRepository);
        this.employeeDepartmentPositionRepository = employeeDepartmentPositionRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeDepartmentPositionRepository.findByEmployeeId(employeeId);
    }
    async findByDepartmentId(departmentId) {
        return this.employeeDepartmentPositionRepository.findByDepartmentId(departmentId);
    }
    async findManagersByDepartmentId(departmentId) {
        return this.employeeDepartmentPositionRepository.findManagersByDepartmentId(departmentId);
    }
};
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService;
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository])
], DomainEmployeeDepartmentPositionService);
//# sourceMappingURL=employee-department-position.service.js.map