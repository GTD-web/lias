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
    async findById(id) {
        const edp = await this.employeeDepartmentPositionRepository.findOne({
            where: { id },
            relations: ['employee', 'department', 'position'],
        });
        if (!edp) {
            throw new common_1.NotFoundException('직원-부서-직책 정보를 찾을 수 없습니다.');
        }
        return edp;
    }
    async findByEmployeeId(employeeId) {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            relations: ['department', 'position'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByDepartmentId(departmentId) {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            order: { createdAt: 'ASC' },
        });
    }
    async findManagersByDepartmentId(departmentId) {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId, isManager: true },
            relations: ['employee', 'position'],
            order: { createdAt: 'ASC' },
        });
    }
    async findByEmployeeAndDepartment(employeeId, departmentId) {
        return await this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId, departmentId },
            relations: ['employee', 'department', 'position'],
        });
    }
    async createEmployeeDepartmentPosition(employeeId, departmentId, positionId, isManager = false) {
        const existing = await this.findByEmployeeAndDepartment(employeeId, departmentId);
        if (existing) {
            throw new common_1.ConflictException('해당 직원은 이미 이 부서에 배정되어 있습니다.');
        }
        const edp = await this.employeeDepartmentPositionRepository.create({
            employeeId,
            departmentId,
            positionId,
            isManager,
        });
        return await this.employeeDepartmentPositionRepository.save(edp);
    }
    async updateEmployeeDepartmentPosition(id, positionId, isManager) {
        const edp = await this.findById(id);
        if (positionId !== undefined) {
            edp.positionId = positionId;
        }
        if (isManager !== undefined) {
            edp.isManager = isManager;
        }
        return await this.employeeDepartmentPositionRepository.save(edp);
    }
    async removeEmployeeDepartmentPosition(id) {
        await this.employeeDepartmentPositionRepository.delete(id);
    }
    async findByPositionId(positionId) {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { positionId },
            relations: ['employee', 'department'],
            order: { createdAt: 'ASC' },
        });
    }
    async findAllManagers() {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { isManager: true },
            relations: ['employee', 'department', 'position'],
            order: { createdAt: 'ASC' },
        });
    }
};
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService;
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository])
], DomainEmployeeDepartmentPositionService);
//# sourceMappingURL=employee-department-position.service.js.map