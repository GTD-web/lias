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
var ApproverMappingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproverMappingService = void 0;
const common_1 = require("@nestjs/common");
const document_template_service_1 = require("../../domain/document-template/document-template.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let ApproverMappingService = ApproverMappingService_1 = class ApproverMappingService {
    constructor(documentTemplateService, employeeService, departmentService) {
        this.documentTemplateService = documentTemplateService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.logger = new common_1.Logger(ApproverMappingService_1.name);
    }
    async getDocumentTemplateWithMappedApprovers(templateId, drafterId) {
        this.logger.debug(`문서 템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        const template = await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates', 'approvalStepTemplates.targetEmployee'],
        });
        const drafter = await this.employeeService.findOneWithError({
            where: { id: drafterId },
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });
        const currentDepartmentPosition = drafter.departmentPositions?.find((dp) => dp.isManager) || drafter.departmentPositions?.[0];
        if (!currentDepartmentPosition) {
            throw new common_1.BadRequestException(`기안자의 부서/직책 정보를 찾을 수 없습니다: ${drafterId}`);
        }
        const drafterDepartment = currentDepartmentPosition.department;
        const drafterPosition = currentDepartmentPosition.position;
        const mappedSteps = await Promise.all(template.approvalStepTemplates.map(async (step) => {
            const mappedStep = {
                ...step,
                mappedApprovers: [],
            };
            switch (step.assigneeRule) {
                case approval_enum_1.AssigneeRule.FIXED:
                    if (step.targetEmployeeId && step.targetEmployee) {
                        mappedStep.mappedApprovers = [
                            {
                                employeeId: step.targetEmployee.id,
                                employeeNumber: step.targetEmployee.employeeNumber,
                                name: step.targetEmployee.name,
                                email: step.targetEmployee.email,
                                type: 'FIXED',
                            },
                        ];
                        delete mappedStep.targetEmployee;
                    }
                    break;
                case approval_enum_1.AssigneeRule.DRAFTER:
                    mappedStep.mappedApprovers = [
                        {
                            employeeId: drafter.id,
                            employeeNumber: drafter.employeeNumber,
                            name: drafter.name,
                            email: drafter.email,
                            type: 'DRAFTER',
                        },
                    ];
                    break;
                case approval_enum_1.AssigneeRule.HIERARCHY_TO_SUPERIOR:
                    const superior = await this.findDirectSuperior(drafter, drafterDepartment, drafterPosition);
                    mappedStep.mappedApprovers = [
                        {
                            employeeId: drafter.id,
                            employeeNumber: drafter.employeeNumber,
                            name: drafter.name,
                            email: drafter.email,
                            type: 'DRAFTER',
                        },
                    ];
                    if (superior) {
                        mappedStep.mappedApprovers.push({
                            employeeId: superior.id,
                            employeeNumber: superior.employeeNumber,
                            name: superior.name,
                            email: superior.email,
                            type: 'SUPERIOR',
                        });
                    }
                    break;
                case approval_enum_1.AssigneeRule.HIERARCHY_TO_POSITION:
                    const hierarchyApprovers = await this.findHierarchyApprovers(drafter, drafterDepartment, drafterPosition, step.targetPositionId);
                    mappedStep.mappedApprovers = hierarchyApprovers;
                    delete mappedStep.targetPosition;
                    break;
                case approval_enum_1.AssigneeRule.DEPARTMENT_REFERENCE:
                    if (step.targetDepartmentId) {
                        const departmentEmployees = await this.findDepartmentEmployees(step.targetDepartmentId);
                        mappedStep.mappedApprovers = departmentEmployees.map((emp) => ({
                            employeeId: emp.id,
                            employeeNumber: emp.employeeNumber,
                            name: emp.name,
                            email: emp.email,
                            type: 'DEPARTMENT_REFERENCE',
                        }));
                        mappedStep.targetDepartment = await this.departmentService.findOne({
                            where: { id: step.targetDepartmentId },
                        });
                    }
                    break;
            }
            return mappedStep;
        }));
        return {
            ...template,
            drafter: {
                id: drafter.id,
                employeeNumber: drafter.employeeNumber,
                name: drafter.name,
                email: drafter.email,
                department: {
                    id: drafterDepartment.id,
                    departmentName: drafterDepartment.departmentName,
                    departmentCode: drafterDepartment.departmentCode,
                },
                position: {
                    id: drafterPosition.id,
                    positionTitle: drafterPosition.positionTitle,
                    positionCode: drafterPosition.positionCode,
                    level: drafterPosition.level,
                },
            },
            approvalStepTemplates: mappedSteps.sort((a, b) => a.stepOrder - b.stepOrder),
        };
    }
    async findDirectSuperior(employee, department, position) {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });
        const superiors = allEmployees.filter((emp) => {
            const empDeptPos = emp.departmentPositions?.find((dp) => dp.departmentId === department.id);
            if (!empDeptPos || emp.id === employee.id)
                return false;
            const empPosition = empDeptPos.position;
            return empPosition && empPosition.level < position.level;
        });
        if (superiors.length > 0) {
            superiors.sort((a, b) => {
                const aDeptPos = a.departmentPositions?.find((dp) => dp.departmentId === department.id);
                const bDeptPos = b.departmentPositions?.find((dp) => dp.departmentId === department.id);
                const aLevel = aDeptPos?.position?.level || 999;
                const bLevel = bDeptPos?.position?.level || 999;
                return aLevel - bLevel;
            });
            return superiors[0];
        }
        return null;
    }
    async findHierarchyApprovers(drafter, drafterDepartment, drafterPosition, targetPositionId) {
        const approvers = [];
        approvers.push({
            employeeId: drafter.id,
            employeeNumber: drafter.employeeNumber,
            name: drafter.name,
            email: drafter.email,
            type: 'DRAFTER',
        });
        const isDrafterDepartmentHead = drafterPosition.hasManagementAuthority || (await this.isDepartmentHead(drafter, drafterDepartment));
        const departmentPath = await this.getDepartmentPathToRoot(drafterDepartment);
        if (!isDrafterDepartmentHead) {
            const drafterDeptHead = await this.findDepartmentHead(drafterDepartment.id);
            if (drafterDeptHead && drafterDeptHead.id !== drafter.id) {
                approvers.push({
                    employeeId: drafterDeptHead.id,
                    employeeNumber: drafterDeptHead.employeeNumber,
                    name: drafterDeptHead.name,
                    email: drafterDeptHead.email,
                    type: 'HIERARCHY',
                    departmentId: drafterDepartment.id,
                    departmentName: drafterDepartment.departmentName,
                    role: '부서장',
                });
            }
        }
        const parentDepartments = departmentPath.slice(1);
        for (const dept of parentDepartments) {
            const deptHead = await this.findDepartmentHead(dept.id);
            if (deptHead && !approvers.find((a) => a.employeeId === deptHead.id)) {
                approvers.push({
                    employeeId: deptHead.id,
                    employeeNumber: deptHead.employeeNumber,
                    name: deptHead.name,
                    email: deptHead.email,
                    type: 'HIERARCHY',
                    departmentId: dept.id,
                    departmentName: dept.departmentName,
                    role: '부서장',
                });
            }
        }
        return approvers;
    }
    async isDepartmentHead(employee, department) {
        const deptPos = employee.departmentPositions?.find((dp) => dp.departmentId === department.id);
        if (!deptPos)
            return false;
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.position'],
        });
        const deptEmployees = allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === department.id);
        });
        if (deptEmployees.length === 0)
            return false;
        const minLevel = Math.min(...deptEmployees
            .map((emp) => {
            const dp = emp.departmentPositions?.find((d) => d.departmentId === department.id);
            return dp?.position?.level ?? 999;
        })
            .filter((level) => level !== 999));
        const empDeptPos = employee.departmentPositions?.find((dp) => dp.departmentId === department.id);
        return empDeptPos?.position?.level === minLevel;
    }
    async findDepartmentHead(departmentId) {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });
        const deptEmployees = allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === departmentId);
        });
        if (deptEmployees.length === 0)
            return null;
        let departmentHead = null;
        let minLevel = 999;
        for (const emp of deptEmployees) {
            const deptPos = emp.departmentPositions?.find((dp) => dp.departmentId === departmentId);
            if (deptPos?.position) {
                if (deptPos.position.hasManagementAuthority) {
                    return emp;
                }
                if (deptPos.position.level < minLevel) {
                    minLevel = deptPos.position.level;
                    departmentHead = emp;
                }
            }
        }
        return departmentHead;
    }
    async getDepartmentPathToRoot(department) {
        const path = [department];
        let current = department;
        while (current.parentDepartmentId) {
            const parent = await this.departmentService.findOne({
                where: { id: current.parentDepartmentId },
            });
            if (parent) {
                path.push(parent);
                current = parent;
            }
            else {
                break;
            }
        }
        return path;
    }
    async findDepartmentEmployees(departmentId) {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions'],
        });
        return allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === departmentId);
        });
    }
};
exports.ApproverMappingService = ApproverMappingService;
exports.ApproverMappingService = ApproverMappingService = ApproverMappingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_template_service_1.DomainDocumentTemplateService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService])
], ApproverMappingService);
//# sourceMappingURL=approver-mapping.service.js.map