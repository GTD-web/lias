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
var SyncAllMetadataUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncAllMetadataUsecase = void 0;
const common_1 = require("@nestjs/common");
const position_service_1 = require("../../../domain/position/position.service");
const rank_service_1 = require("../../../domain/rank/rank.service");
const department_service_1 = require("../../../domain/department/department.service");
const employee_service_1 = require("../../../domain/employee/employee.service");
const employee_department_position_service_1 = require("../../../domain/employee-department-position/employee-department-position.service");
let SyncAllMetadataUsecase = SyncAllMetadataUsecase_1 = class SyncAllMetadataUsecase {
    constructor(positionService, rankService, departmentService, employeeService, employeeDepartmentPositionService) {
        this.positionService = positionService;
        this.rankService = rankService;
        this.departmentService = departmentService;
        this.employeeService = employeeService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.logger = new common_1.Logger(SyncAllMetadataUsecase_1.name);
    }
    async execute(data) {
        this.logger.log('전체 메타데이터 동기화 시작');
        try {
            await this.syncPositions(data.positions);
            await this.syncRanks(data.ranks);
            await this.syncDepartments(data.departments);
            await this.syncEmployees(data.employees);
            await this.syncEmployeeDepartmentPositions(data.employeeDepartmentPositions);
            this.logger.log('전체 메타데이터 동기화 완료');
        }
        catch (error) {
            this.logger.error('전체 메타데이터 동기화 실패', error);
            throw error;
        }
    }
    async syncPositions(positions) {
        this.logger.log(`Position 동기화 시작 (${positions.length}개)`);
        for (const position of positions) {
            try {
                const existing = await this.positionService.findOne({ where: { id: position.id } });
                if (existing) {
                    existing.positionTitle = position.positionTitle;
                    existing.positionCode = position.positionCode;
                    existing.level = position.level;
                    existing.hasManagementAuthority = position.hasManagementAuthority;
                    await this.positionService.save(existing);
                    this.logger.debug(`Position 업데이트: ${position.positionTitle}`);
                }
                else {
                    const newPosition = await this.positionService.create({
                        id: position.id,
                        positionTitle: position.positionTitle,
                        positionCode: position.positionCode,
                        level: position.level,
                        hasManagementAuthority: position.hasManagementAuthority,
                    });
                    await this.positionService.save(newPosition);
                    this.logger.debug(`Position 생성: ${position.positionTitle}`);
                }
            }
            catch (error) {
                this.logger.error(`Position 동기화 실패: ${position.positionTitle}`, error);
            }
        }
        this.logger.log('Position 동기화 완료');
    }
    async syncRanks(ranks) {
        this.logger.log(`Rank 동기화 시작 (${ranks.length}개)`);
        for (const rank of ranks) {
            try {
                const existing = await this.rankService.findOne({ where: { id: rank.id } });
                if (existing) {
                    existing.rankTitle = rank.rankName;
                    existing.rankCode = rank.rankCode;
                    existing.level = rank.level;
                    await this.rankService.save(existing);
                    this.logger.debug(`Rank 업데이트: ${rank.rankName}`);
                }
                else {
                    const newRank = await this.rankService.create({
                        id: rank.id,
                        rankTitle: rank.rankName,
                        rankCode: rank.rankCode,
                        level: rank.level,
                    });
                    await this.rankService.save(newRank);
                    this.logger.debug(`Rank 생성: ${rank.rankName}`);
                }
            }
            catch (error) {
                this.logger.error(`Rank 동기화 실패: ${rank.rankName}`, error);
            }
        }
        this.logger.log('Rank 동기화 완료');
    }
    async syncDepartments(departments) {
        this.logger.log(`Department 동기화 시작 (${departments.length}개)`);
        const sortedDepartments = [...departments].sort((a, b) => a.order - b.order);
        for (const department of sortedDepartments) {
            try {
                const existing = await this.departmentService.findOne({ where: { id: department.id } });
                if (existing) {
                    existing.departmentName = department.departmentName;
                    existing.departmentCode = department.departmentCode;
                    existing.type = department.type;
                    existing.parentDepartmentId = department.parentDepartmentId;
                    existing.order = department.order;
                    await this.departmentService.save(existing);
                    this.logger.debug(`Department 업데이트: ${department.departmentName}`);
                }
                else {
                    const newDepartment = await this.departmentService.create({
                        id: department.id,
                        departmentName: department.departmentName,
                        departmentCode: department.departmentCode,
                        type: department.type,
                        parentDepartmentId: department.parentDepartmentId,
                        order: department.order,
                    });
                    await this.departmentService.save(newDepartment);
                    this.logger.debug(`Department 생성: ${department.departmentName}`);
                }
            }
            catch (error) {
                this.logger.error(`Department 동기화 실패: ${department.departmentName}`, error);
            }
        }
        this.logger.log('Department 동기화 완료');
    }
    async syncEmployees(employees) {
        this.logger.log(`Employee 동기화 시작 (${employees.length}개)`);
        for (const employee of employees) {
            try {
                const existing = await this.employeeService.findOne({ where: { id: employee.id } });
                if (existing) {
                    existing.employeeNumber = employee.employeeNumber;
                    existing.name = employee.name;
                    existing.email = employee.email;
                    existing.password = employee.password;
                    existing.phoneNumber = employee.phoneNumber;
                    existing.dateOfBirth = employee.dateOfBirth;
                    existing.gender = employee.gender;
                    existing.hireDate = employee.hireDate;
                    existing.status = employee.status;
                    existing.currentRankId = employee.currentRankId;
                    existing.terminationDate = employee.terminationDate;
                    existing.terminationReason = employee.terminationReason;
                    existing.isInitialPasswordSet = employee.isInitialPasswordSet;
                    await this.employeeService.save(existing);
                    this.logger.debug(`Employee 업데이트: ${employee.name} (${employee.employeeNumber})`);
                }
                else {
                    const newEmployee = await this.employeeService.create({
                        id: employee.id,
                        employeeNumber: employee.employeeNumber,
                        name: employee.name,
                        email: employee.email,
                        password: employee.password,
                        phoneNumber: employee.phoneNumber,
                        dateOfBirth: employee.dateOfBirth,
                        gender: employee.gender,
                        hireDate: employee.hireDate,
                        status: employee.status,
                        currentRankId: employee.currentRankId,
                        terminationDate: employee.terminationDate,
                        terminationReason: employee.terminationReason,
                        isInitialPasswordSet: employee.isInitialPasswordSet,
                    });
                    await this.employeeService.save(newEmployee);
                    this.logger.debug(`Employee 생성: ${employee.name} (${employee.employeeNumber})`);
                }
            }
            catch (error) {
                this.logger.error(`Employee 동기화 실패: ${employee.name} (${employee.employeeNumber})`, error);
            }
        }
        this.logger.log('Employee 동기화 완료');
    }
    async syncEmployeeDepartmentPositions(employeeDepartmentPositions) {
        this.logger.log(`EmployeeDepartmentPosition 동기화 시작 (${employeeDepartmentPositions.length}개)`);
        for (const edp of employeeDepartmentPositions) {
            try {
                const existing = await this.employeeDepartmentPositionService.findOne({ where: { id: edp.id } });
                if (existing) {
                    existing.employeeId = edp.employeeId;
                    existing.departmentId = edp.departmentId;
                    existing.positionId = edp.positionId;
                    existing.isManager = edp.isManager;
                    await this.employeeDepartmentPositionService.save(existing);
                    this.logger.debug(`EmployeeDepartmentPosition 업데이트: ${edp.id}`);
                }
                else {
                    const newEdp = await this.employeeDepartmentPositionService.create({
                        id: edp.id,
                        employeeId: edp.employeeId,
                        departmentId: edp.departmentId,
                        positionId: edp.positionId,
                        isManager: edp.isManager,
                    });
                    await this.employeeDepartmentPositionService.save(newEdp);
                    this.logger.debug(`EmployeeDepartmentPosition 생성: ${edp.id}`);
                }
            }
            catch (error) {
                this.logger.error(`EmployeeDepartmentPosition 동기화 실패: ${edp.id}`, error);
            }
        }
        this.logger.log('EmployeeDepartmentPosition 동기화 완료');
    }
};
exports.SyncAllMetadataUsecase = SyncAllMetadataUsecase;
exports.SyncAllMetadataUsecase = SyncAllMetadataUsecase = SyncAllMetadataUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [position_service_1.DomainPositionService,
        rank_service_1.DomainRankService,
        department_service_1.DomainDepartmentService,
        employee_service_1.DomainEmployeeService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], SyncAllMetadataUsecase);
//# sourceMappingURL=syncAllMetadata.usecase.js.map