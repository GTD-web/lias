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
var MetadataContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataContext = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("../../domain/department/department.service");
const position_service_1 = require("../../domain/position/position.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const employee_department_position_service_1 = require("../../domain/employee-department-position/employee-department-position.service");
const employee_enum_1 = require("../../../common/enums/employee.enum");
const sso_1 = require("../../integrations/sso");
const typeorm_1 = require("typeorm");
let MetadataContext = MetadataContext_1 = class MetadataContext {
    constructor(departmentService, positionService, employeeService, employeeDepartmentPositionService, ssoService) {
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.employeeService = employeeService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.ssoService = ssoService;
        this.logger = new common_1.Logger(MetadataContext_1.name);
    }
    async getAllDepartments() {
        this.logger.debug('모든 부서 조회');
        return await this.departmentService.findAll({ where: { departmentCode: (0, typeorm_1.Not)('퇴사자') } });
    }
    async getEmployeesByDepartment(departmentId, activeOnly = true) {
        this.logger.debug(`부서별 직원 조회: ${departmentId}, activeOnly: ${activeOnly}`);
        const department = await this.departmentService.findOne({ where: { id: departmentId } });
        if (!department) {
            throw new common_1.NotFoundException(`ID가 ${departmentId}인 부서를 찾을 수 없습니다`);
        }
        const edps = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId },
            relations: ['employee', 'department', 'position'],
        });
        const employeeMap = new Map();
        for (const edp of edps) {
            if (!edp.employee)
                continue;
            if (activeOnly && edp.employee.status !== employee_enum_1.EmployeeStatus.Active)
                continue;
            const employeeId = edp.employee.id;
            if (!employeeMap.has(employeeId)) {
                employeeMap.set(employeeId, {
                    id: edp.employee.id,
                    employeeNumber: edp.employee.employeeNumber,
                    name: edp.employee.name,
                    email: edp.employee.email,
                    phoneNumber: edp.employee.phoneNumber,
                    status: edp.employee.status,
                    hireDate: edp.employee.hireDate,
                    departments: [],
                });
            }
            const employee = employeeMap.get(employeeId);
            employee.departments.push({
                department: {
                    id: edp.department?.id,
                    departmentCode: edp.department?.departmentCode,
                    departmentName: edp.department?.departmentName,
                },
                position: edp.position
                    ? {
                        id: edp.position.id,
                        positionCode: edp.position.positionCode,
                        positionTitle: edp.position.positionTitle,
                        level: edp.position.level,
                        hasManagementAuthority: edp.position.hasManagementAuthority,
                    }
                    : null,
            });
        }
        return Array.from(employeeMap.values());
    }
    async getAllPositions() {
        this.logger.debug('모든 직급 조회');
        return await this.positionService.findAll();
    }
    async searchEmployees(search, departmentId) {
        this.logger.debug(`직원 검색: search=${search}, departmentId=${departmentId}`);
        const whereCondition = {};
        if (departmentId) {
            whereCondition.departmentId = departmentId;
        }
        const edps = await this.employeeDepartmentPositionService.findAll({
            where: whereCondition,
            relations: ['employee', 'department', 'position'],
        });
        const employeeMap = new Map();
        for (const edp of edps) {
            if (!edp.employee)
                continue;
            if (search) {
                const searchLower = search.toLowerCase();
                const matchesSearch = edp.employee.name.toLowerCase().includes(searchLower) ||
                    edp.employee.employeeNumber.toLowerCase().includes(searchLower) ||
                    edp.employee.email?.toLowerCase().includes(searchLower);
                if (!matchesSearch)
                    continue;
            }
            const employeeId = edp.employee.id;
            if (!employeeMap.has(employeeId)) {
                employeeMap.set(employeeId, {
                    id: edp.employee.id,
                    employeeNumber: edp.employee.employeeNumber,
                    name: edp.employee.name,
                    email: edp.employee.email,
                    phoneNumber: edp.employee.phoneNumber,
                    status: edp.employee.status,
                    hireDate: edp.employee.hireDate,
                    departments: [],
                });
            }
            const employee = employeeMap.get(employeeId);
            employee.departments.push({
                department: {
                    id: edp.department?.id,
                    departmentCode: edp.department?.departmentCode,
                    departmentName: edp.department?.departmentName,
                },
                position: edp.position
                    ? {
                        id: edp.position.id,
                        positionCode: edp.position.positionCode,
                        positionTitle: edp.position.positionTitle,
                        level: edp.position.level,
                        hasManagementAuthority: edp.position.hasManagementAuthority,
                    }
                    : null,
            });
        }
        return Array.from(employeeMap.values());
    }
    async getEmployeeById(employeeId) {
        this.logger.debug(`직원 상세 조회: ${employeeId}`);
        const employee = await this.employeeService.findOne({ where: { id: employeeId } });
        if (!employee) {
            throw new common_1.NotFoundException(`ID가 ${employeeId}인 직원을 찾을 수 없습니다`);
        }
        const edps = await this.employeeDepartmentPositionService.findAll({
            where: { employeeId },
            relations: ['department', 'position'],
        });
        return {
            id: employee.id,
            employeeNumber: employee.employeeNumber,
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            status: employee.status,
            hireDate: employee.hireDate,
            departments: edps.map((edp) => ({
                department: {
                    id: edp.department?.id,
                    departmentCode: edp.department?.departmentCode,
                    departmentName: edp.department?.departmentName,
                },
                position: edp.position
                    ? {
                        id: edp.position.id,
                        positionCode: edp.position.positionCode,
                        positionTitle: edp.position.positionTitle,
                        level: edp.position.level,
                        hasManagementAuthority: edp.position.hasManagementAuthority,
                    }
                    : null,
            })),
        };
    }
    async getDepartmentHierarchyWithEmployees(activeOnly = true) {
        this.logger.debug(`계층구조 부서 및 직원 조회: activeOnly=${activeOnly}`);
        const allDepartments = await this.departmentService.findAll({
            where: { departmentCode: (0, typeorm_1.Not)('퇴사자') },
            order: { order: 'ASC' },
        });
        const allEdps = await this.employeeDepartmentPositionService.findAll({
            relations: ['employee', 'department', 'position'],
        });
        const departmentEmployeesMap = new Map();
        for (const edp of allEdps) {
            if (!edp.employee || !edp.departmentId)
                continue;
            if (activeOnly && edp.employee.status !== employee_enum_1.EmployeeStatus.Active)
                continue;
            const employeeId = edp.employee.id;
            const departmentId = edp.departmentId;
            if (!departmentEmployeesMap.has(departmentId)) {
                departmentEmployeesMap.set(departmentId, []);
            }
            const existingEmployee = departmentEmployeesMap.get(departmentId).find((e) => e.id === employeeId);
            if (!existingEmployee) {
                departmentEmployeesMap.get(departmentId).push({
                    id: edp.employee.id,
                    employeeNumber: edp.employee.employeeNumber,
                    name: edp.employee.name,
                    email: edp.employee.email,
                    phoneNumber: edp.employee.phoneNumber,
                    status: edp.employee.status,
                    departmentId: departmentId,
                    positionTitle: edp.position?.positionTitle,
                    positionLevel: edp.position?.level,
                });
            }
        }
        const buildHierarchy = (parentId = null) => {
            return allDepartments
                .filter((dept) => dept.parentDepartmentId === parentId)
                .map((dept) => ({
                id: dept.id,
                departmentCode: dept.departmentCode,
                departmentName: dept.departmentName,
                type: dept.type,
                order: dept.order,
                parentDepartmentId: dept.parentDepartmentId,
                employees: departmentEmployeesMap.get(dept.id) || [],
                children: buildHierarchy(dept.id),
            }));
        };
        return buildHierarchy(null);
    }
    async 로그인한다(email, password) {
        this.logger.debug(`로그인 시도: ${email}`);
        const loginResult = await this.ssoService.login(email, password);
        this.logger.log(`로그인 성공: ${loginResult.name} (${loginResult.employeeNumber})`);
        return {
            accessToken: loginResult.accessToken,
        };
    }
};
exports.MetadataContext = MetadataContext;
exports.MetadataContext = MetadataContext = MetadataContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        employee_service_1.DomainEmployeeService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService,
        sso_1.SSOService])
], MetadataContext);
//# sourceMappingURL=metadata.context.js.map