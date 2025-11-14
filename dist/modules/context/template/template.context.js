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
var TemplateContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateContext = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const document_template_service_1 = require("../../domain/document-template/document-template.service");
const approval_step_template_service_1 = require("../../domain/approval-step-template/approval-step-template.service");
const category_service_1 = require("../../domain/category/category.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const position_service_1 = require("../../domain/position/position.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const approval_rule_validator_1 = require("../../../common/utils/approval-rule-validator");
const transaction_util_1 = require("../../../common/utils/transaction.util");
let TemplateContext = TemplateContext_1 = class TemplateContext {
    constructor(dataSource, documentTemplateService, approvalStepTemplateService, categoryService, employeeService, departmentService, positionService) {
        this.dataSource = dataSource;
        this.documentTemplateService = documentTemplateService;
        this.approvalStepTemplateService = approvalStepTemplateService;
        this.categoryService = categoryService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.logger = new common_1.Logger(TemplateContext_1.name);
    }
    async createDocumentTemplate(dto, externalQueryRunner) {
        this.logger.log(`문서 템플릿 생성 시작: ${dto.name}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            if (dto.categoryId) {
                const category = await this.categoryService.findOne({
                    where: { id: dto.categoryId },
                    queryRunner,
                });
                if (!category) {
                    throw new common_1.NotFoundException(`카테고리를 찾을 수 없습니다: ${dto.categoryId}`);
                }
            }
            const templateEntity = await this.documentTemplateService.create({
                name: dto.name,
                code: dto.code,
                description: dto.description,
                template: dto.template || '',
                status: dto.status || approval_enum_1.DocumentTemplateStatus.DRAFT,
                categoryId: dto.categoryId,
            }, { queryRunner });
            const template = await this.documentTemplateService.save(templateEntity, { queryRunner });
            this.logger.log(`문서 템플릿 생성 완료: ${template.id}`);
            return template;
        }, externalQueryRunner);
    }
    async updateDocumentTemplate(templateId, dto, externalQueryRunner) {
        this.logger.log(`문서 템플릿 수정 시작: ${templateId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const template = await this.documentTemplateService.findOne({
                where: { id: templateId },
                queryRunner,
            });
            if (!template) {
                throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
            }
            if (dto.categoryId !== undefined) {
                if (dto.categoryId) {
                    const category = await this.categoryService.findOne({
                        where: { id: dto.categoryId },
                        queryRunner,
                    });
                    if (!category) {
                        throw new common_1.NotFoundException(`카테고리를 찾을 수 없습니다: ${dto.categoryId}`);
                    }
                }
            }
            const updated = await this.documentTemplateService.update(templateId, {
                ...(dto.name && { name: dto.name }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.template !== undefined && { template: dto.template }),
                ...(dto.status && { status: dto.status }),
                ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
            }, { queryRunner });
            this.logger.log(`문서 템플릿 수정 완료: ${templateId}`);
            return updated;
        }, externalQueryRunner);
    }
    async deleteDocumentTemplate(templateId, externalQueryRunner) {
        this.logger.log(`문서 템플릿 삭제 시작: ${templateId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const template = await this.documentTemplateService.findOne({
                where: { id: templateId },
                queryRunner,
            });
            if (!template) {
                throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
            }
            const steps = await this.approvalStepTemplateService.findAll({
                where: { documentTemplateId: templateId },
                queryRunner,
            });
            for (const step of steps) {
                await this.approvalStepTemplateService.delete(step.id, { queryRunner });
                this.logger.debug(`결재단계 템플릿 삭제: ${step.id}`);
            }
            await this.documentTemplateService.delete(templateId, { queryRunner });
            this.logger.log(`문서 템플릿 삭제 완료: ${templateId}, 결재단계 템플릿 ${steps.length}개 함께 삭제`);
        }, externalQueryRunner);
    }
    async getDocumentTemplate(templateId) {
        this.logger.debug(`문서 템플릿 조회: ${templateId}`);
        const template = await this.documentTemplateService.findOne({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates'],
        });
        if (!template) {
            throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
        }
        return template;
    }
    async getDocumentTemplateWithMappedApprovers(templateId, drafterId) {
        this.logger.debug(`문서 템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        const template = await this.documentTemplateService.findOne({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates', 'approvalStepTemplates.targetEmployee'],
        });
        if (!template) {
            throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
        }
        const drafter = await this.employeeService.findOne({
            where: { id: drafterId },
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });
        if (!drafter) {
            throw new common_1.NotFoundException(`기안자를 찾을 수 없습니다: ${drafterId}`);
        }
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
                        delete mappedStep.targetDepartment;
                    }
                    break;
            }
            return mappedStep;
        }));
        return {
            ...template,
            approvalStepTemplates: mappedSteps,
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
    async findEmployeesByDepartmentAndPosition(departmentId, positionId) {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });
        return allEmployees.filter((emp) => {
            const deptPos = emp.departmentPositions?.find((dp) => dp.departmentId === departmentId);
            if (!deptPos)
                return false;
            if (positionId) {
                return deptPos.positionId === positionId;
            }
            return true;
        });
    }
    async findDepartmentEmployees(departmentId) {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions'],
        });
        return allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === departmentId);
        });
    }
    async getDocumentTemplates(categoryId, status) {
        this.logger.debug(`문서 템플릿 목록 조회: categoryId=${categoryId}, status=${status}`);
        const where = {};
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (status) {
            where.status = status;
        }
        return await this.documentTemplateService.findAll({
            where,
            relations: ['category'],
            order: { createdAt: 'DESC' },
        });
    }
    async createApprovalStepTemplate(dto, externalQueryRunner) {
        this.logger.log(`결재단계 템플릿 생성 시작: documentTemplateId=${dto.documentTemplateId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const documentTemplate = await this.documentTemplateService.findOne({
                where: { id: dto.documentTemplateId },
                queryRunner,
            });
            if (!documentTemplate) {
                throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${dto.documentTemplateId}`);
            }
            const validation = approval_rule_validator_1.ApprovalRuleValidator.validateComplete(dto.stepType, dto.assigneeRule, {
                targetEmployeeId: dto.targetEmployeeId,
                targetDepartmentId: dto.targetDepartmentId,
                targetPositionId: dto.targetPositionId,
            });
            if (!validation.isValid) {
                throw new common_1.BadRequestException(`검증 실패: ${validation.errors.join(', ')}`);
            }
            const existingSteps = await this.approvalStepTemplateService.findAll({
                where: { documentTemplateId: dto.documentTemplateId },
                queryRunner,
            });
            const maxOrder = existingSteps.length > 0 ? Math.max(...existingSteps.map((s) => s.stepOrder)) : 0;
            const stepOrder = dto.stepOrder || maxOrder + 1;
            const duplicateOrder = existingSteps.find((s) => s.stepOrder === stepOrder);
            if (duplicateOrder) {
                throw new common_1.BadRequestException(`이미 ${stepOrder}번째 순서의 단계가 존재합니다.`);
            }
            const stepEntity = await this.approvalStepTemplateService.create({
                documentTemplateId: dto.documentTemplateId,
                stepOrder,
                stepType: dto.stepType,
                assigneeRule: dto.assigneeRule,
                targetEmployeeId: dto.targetEmployeeId,
                targetDepartmentId: dto.targetDepartmentId,
                targetPositionId: dto.targetPositionId,
            }, { queryRunner });
            const step = await this.approvalStepTemplateService.save(stepEntity, { queryRunner });
            this.logger.log(`결재단계 템플릿 생성 완료: ${step.id}`);
            return step;
        }, externalQueryRunner);
    }
    async updateApprovalStepTemplate(stepId, dto, externalQueryRunner) {
        this.logger.log(`결재단계 템플릿 수정 시작: ${stepId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepTemplateService.findOne({
                where: { id: stepId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`결재단계 템플릿을 찾을 수 없습니다: ${stepId}`);
            }
            if (dto.stepType || dto.assigneeRule) {
                const stepType = dto.stepType || step.stepType;
                const assigneeRule = dto.assigneeRule || step.assigneeRule;
                const validation = approval_rule_validator_1.ApprovalRuleValidator.validateComplete(stepType, assigneeRule, {
                    targetEmployeeId: dto.targetEmployeeId ?? step.targetEmployeeId,
                    targetDepartmentId: dto.targetDepartmentId ?? step.targetDepartmentId,
                    targetPositionId: dto.targetPositionId ?? step.targetPositionId,
                });
                if (!validation.isValid) {
                    throw new common_1.BadRequestException(`검증 실패: ${validation.errors.join(', ')}`);
                }
            }
            if (dto.stepOrder !== undefined && dto.stepOrder !== step.stepOrder) {
                const existingSteps = await this.approvalStepTemplateService.findAll({
                    where: { documentTemplateId: step.documentTemplateId },
                    queryRunner,
                });
                const duplicateOrder = existingSteps.find((s) => s.id !== stepId && s.stepOrder === dto.stepOrder);
                if (duplicateOrder) {
                    throw new common_1.BadRequestException(`이미 ${dto.stepOrder}번째 순서의 단계가 존재합니다.`);
                }
            }
            const updated = await this.approvalStepTemplateService.update(stepId, {
                ...(dto.stepOrder !== undefined && { stepOrder: dto.stepOrder }),
                ...(dto.stepType && { stepType: dto.stepType }),
                ...(dto.assigneeRule && { assigneeRule: dto.assigneeRule }),
                ...(dto.targetEmployeeId !== undefined && { targetEmployeeId: dto.targetEmployeeId }),
                ...(dto.targetDepartmentId !== undefined && {
                    targetDepartmentId: dto.targetDepartmentId,
                }),
                ...(dto.targetPositionId !== undefined && { targetPositionId: dto.targetPositionId }),
            }, { queryRunner });
            this.logger.log(`결재단계 템플릿 수정 완료: ${stepId}`);
            return updated;
        }, externalQueryRunner);
    }
    async deleteApprovalStepTemplate(stepId, externalQueryRunner) {
        this.logger.log(`결재단계 템플릿 삭제 시작: ${stepId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepTemplateService.findOne({
                where: { id: stepId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`결재단계 템플릿을 찾을 수 없습니다: ${stepId}`);
            }
            await this.approvalStepTemplateService.delete(stepId, { queryRunner });
            this.logger.log(`결재단계 템플릿 삭제 완료: ${stepId}`);
        }, externalQueryRunner);
    }
    async getApprovalStepTemplatesByDocumentTemplate(documentTemplateId) {
        this.logger.debug(`결재단계 템플릿 목록 조회: documentTemplateId=${documentTemplateId}`);
        const steps = await this.approvalStepTemplateService.findAll({
            where: { documentTemplateId },
            relations: ['targetEmployee', 'targetDepartment', 'targetPosition'],
            order: { stepOrder: 'ASC' },
        });
        const stepsWithDetails = await Promise.all(steps.map(async (step) => {
            const stepDetail = { ...step };
            if (step.targetEmployeeId && step.targetEmployee) {
                stepDetail.targetEmployee = {
                    id: step.targetEmployee.id,
                    employeeNumber: step.targetEmployee.employeeNumber,
                    name: step.targetEmployee.name,
                    email: step.targetEmployee.email,
                };
            }
            if (step.targetDepartmentId && step.targetDepartment) {
                stepDetail.targetDepartment = {
                    id: step.targetDepartment.id,
                    departmentCode: step.targetDepartment.departmentCode,
                    departmentName: step.targetDepartment.departmentName,
                };
            }
            if (step.targetPositionId && step.targetPosition) {
                stepDetail.targetPosition = {
                    id: step.targetPosition.id,
                    positionCode: step.targetPosition.positionCode,
                    positionTitle: step.targetPosition.positionTitle,
                    level: step.targetPosition.level,
                    hasManagementAuthority: step.targetPosition.hasManagementAuthority,
                };
            }
            return stepDetail;
        }));
        return stepsWithDetails;
    }
    async createCategory(dto, externalQueryRunner) {
        this.logger.log(`카테고리 생성 시작: ${dto.name}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const existingCategory = await this.categoryService.findOne({
                where: { code: dto.code },
                queryRunner,
            });
            if (existingCategory) {
                throw new common_1.BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
            }
            const categoryEntity = await this.categoryService.create({
                name: dto.name,
                code: dto.code,
                description: dto.description,
                order: dto.order ?? 0,
            }, { queryRunner });
            const category = await this.categoryService.save(categoryEntity, { queryRunner });
            this.logger.log(`카테고리 생성 완료: ${category.id}`);
            return category;
        }, externalQueryRunner);
    }
    async updateCategory(categoryId, dto, externalQueryRunner) {
        this.logger.log(`카테고리 수정 시작: ${categoryId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const category = await this.categoryService.findOne({
                where: { id: categoryId },
                queryRunner,
            });
            if (!category) {
                throw new common_1.NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
            }
            if (dto.code && dto.code !== category.code) {
                const existingCategory = await this.categoryService.findOne({
                    where: { code: dto.code },
                    queryRunner,
                });
                if (existingCategory) {
                    throw new common_1.BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
                }
            }
            const updated = await this.categoryService.update(categoryId, {
                ...(dto.name && { name: dto.name }),
                ...(dto.code && { code: dto.code }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.order !== undefined && { order: dto.order }),
            }, { queryRunner });
            this.logger.log(`카테고리 수정 완료: ${categoryId}`);
            return updated;
        }, externalQueryRunner);
    }
    async deleteCategory(categoryId, externalQueryRunner) {
        this.logger.log(`카테고리 삭제 시작: ${categoryId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const category = await this.categoryService.findOne({
                where: { id: categoryId },
                relations: ['documentTemplates'],
                queryRunner,
            });
            if (!category) {
                throw new common_1.NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
            }
            if (category.documentTemplates && category.documentTemplates.length > 0) {
                throw new common_1.BadRequestException(`연결된 문서 템플릿이 있어 삭제할 수 없습니다. 먼저 문서 템플릿의 카테고리를 변경하세요.`);
            }
            await this.categoryService.delete(categoryId, { queryRunner });
            this.logger.log(`카테고리 삭제 완료: ${categoryId}`);
        }, externalQueryRunner);
    }
    async getCategory(categoryId) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);
        const category = await this.categoryService.findOne({
            where: { id: categoryId },
            relations: ['documentTemplates'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
        }
        return category;
    }
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');
        return await this.categoryService.findAll({
            relations: ['documentTemplates'],
            order: { order: 'ASC', createdAt: 'ASC' },
        });
    }
};
exports.TemplateContext = TemplateContext;
exports.TemplateContext = TemplateContext = TemplateContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_template_service_1.DomainDocumentTemplateService,
        approval_step_template_service_1.DomainApprovalStepTemplateService,
        category_service_1.DomainCategoryService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService])
], TemplateContext);
//# sourceMappingURL=template.context.js.map