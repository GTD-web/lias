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
var PreviewApprovalLineUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewApprovalLineUsecase = void 0;
const common_1 = require("@nestjs/common");
const form_service_1 = require("../../../domain/form/form.service");
const form_version_service_1 = require("../../../domain/form/form-version.service");
const approval_line_template_service_1 = require("../../../domain/approval-line-template/approval-line-template.service");
const approval_line_template_version_service_1 = require("../../../domain/approval-line-template/approval-line-template-version.service");
const approval_step_template_service_1 = require("../../../domain/approval-step-template/approval-step-template.service");
const form_version_approval_line_template_version_service_1 = require("../../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service");
const employee_service_1 = require("../../../domain/employee/employee.service");
const department_service_1 = require("../../../domain/department/department.service");
const position_service_1 = require("../../../domain/position/position.service");
const employee_department_position_service_1 = require("../../../domain/employee-department-position/employee-department-position.service");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let PreviewApprovalLineUsecase = PreviewApprovalLineUsecase_1 = class PreviewApprovalLineUsecase {
    constructor(formService, formVersionService, approvalLineTemplateService, approvalLineTemplateVersionService, approvalStepTemplateService, formVersionApprovalLineTemplateVersionService, employeeService, departmentService, positionService, employeeDepartmentPositionService) {
        this.formService = formService;
        this.formVersionService = formVersionService;
        this.approvalLineTemplateService = approvalLineTemplateService;
        this.approvalLineTemplateVersionService = approvalLineTemplateVersionService;
        this.approvalStepTemplateService = approvalStepTemplateService;
        this.formVersionApprovalLineTemplateVersionService = formVersionApprovalLineTemplateVersionService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.logger = new common_1.Logger(PreviewApprovalLineUsecase_1.name);
    }
    async execute(drafterId, formId, dto) {
        this.logger.log(`결재선 미리보기 요청: 기안자=${drafterId}, formId=${formId}, formVersionId=${dto.formVersionId}`);
        const form = await this.formService.findOne({
            where: { id: formId },
        });
        if (!form) {
            throw new common_1.NotFoundException(`문서양식을 찾을 수 없습니다: ${formId}`);
        }
        let drafterDepartmentId = dto.drafterDepartmentId;
        if (!drafterDepartmentId) {
            this.logger.debug(`기안 부서 미입력 → 직원의 주 소속 부서 자동 조회: ${drafterId}`);
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: drafterId },
            });
            if (!edp) {
                throw new common_1.BadRequestException('기안자의 부서 정보를 찾을 수 없습니다.');
            }
            drafterDepartmentId = edp.departmentId;
        }
        const formVersion = await this.formVersionService.findOne({
            where: { id: dto.formVersionId },
        });
        if (!formVersion) {
            throw new common_1.NotFoundException(`FormVersion을 찾을 수 없습니다: ${dto.formVersionId}`);
        }
        const link = await this.formVersionApprovalLineTemplateVersionService.findOne({
            where: { formVersionId: formVersion.id, isDefault: true },
        });
        let steps = [];
        let templateName = '자동 생성 결재선';
        let templateDescription = '부서 계층에 따른 자동 생성 결재선';
        if (!link) {
            this.logger.debug(`결재선 템플릿이 없어서 자동 계층 결재선 미리보기 생성`);
            steps = await this.generateHierarchicalPreview(drafterId, drafterDepartmentId);
        }
        else {
            const lineTemplateVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: link.approvalLineTemplateVersionId },
            });
            if (!lineTemplateVersion) {
                throw new common_1.NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다.`);
            }
            const template = await this.approvalLineTemplateService.findOne({
                where: { id: lineTemplateVersion.templateId },
            });
            templateName = template?.name || '결재선';
            templateDescription = template?.description;
            const stepTemplates = await this.approvalStepTemplateService.findAll({
                where: { lineTemplateVersionId: lineTemplateVersion.id },
                order: { stepOrder: 'ASC' },
            });
            for (const stepTemplate of stepTemplates) {
                const approvers = await this.resolveAssigneeRule(stepTemplate.assigneeRule, {
                    drafterId,
                    drafterDepartmentId,
                    documentAmount: dto.documentAmount,
                    documentType: dto.documentType,
                }, stepTemplate);
                for (const approver of approvers) {
                    const employee = await this.employeeService.findOne({
                        where: { id: approver.employeeId },
                    });
                    let departmentName;
                    let positionTitle;
                    if (approver.departmentId) {
                        const dept = await this.departmentService.findOne({
                            where: { id: approver.departmentId },
                        });
                        departmentName = dept?.departmentName;
                    }
                    if (approver.positionId) {
                        const pos = await this.positionService.findOne({
                            where: { id: approver.positionId },
                        });
                        positionTitle = pos?.positionTitle;
                    }
                    steps.push({
                        stepOrder: stepTemplate.stepOrder,
                        stepType: stepTemplate.stepType,
                        isRequired: stepTemplate.required,
                        employeeId: approver.employeeId,
                        employeeName: employee?.name || '알 수 없음',
                        departmentName,
                        positionTitle,
                        assigneeRule: stepTemplate.assigneeRule,
                    });
                }
            }
        }
        this.logger.log(`결재선 미리보기 완료: ${steps.length}개 단계`);
        return {
            templateName,
            templateDescription,
            steps,
        };
    }
    async generateHierarchicalPreview(drafterId, drafterDepartmentId) {
        this.logger.log(`자동 계층 결재선 미리보기 생성: 기안자=${drafterId}, 부서=${drafterDepartmentId}`);
        const steps = [];
        let stepOrder = 1;
        const drafter = await this.employeeService.findOne({
            where: { id: drafterId },
        });
        const drafterEdp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: drafterId, departmentId: drafterDepartmentId },
        });
        const drafterDepartment = await this.departmentService.findOne({
            where: { id: drafterDepartmentId },
        });
        let drafterPositionTitle;
        if (drafterEdp?.positionId) {
            const position = await this.positionService.findOne({
                where: { id: drafterEdp.positionId },
            });
            drafterPositionTitle = position?.positionTitle;
        }
        steps.push({
            stepOrder,
            stepType: 'APPROVAL',
            isRequired: true,
            employeeId: drafterId,
            employeeName: drafter?.name || '알 수 없음',
            departmentName: drafterDepartment?.departmentName,
            positionTitle: drafterPositionTitle,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
        });
        this.logger.debug(`단계 ${stepOrder}: 기안자 ${drafter?.name} 추가`);
        stepOrder++;
        let currentDepartmentId = drafterDepartmentId;
        let maxSteps = 10;
        while (currentDepartmentId && maxSteps > 0) {
            let departmentHeadEdp = await this.employeeDepartmentPositionService.findOne({
                where: { departmentId: currentDepartmentId, isManager: true },
            });
            if (!departmentHeadEdp) {
                const allEdps = await this.employeeDepartmentPositionService.findAll({
                    where: { departmentId: currentDepartmentId },
                });
                for (const edp of allEdps) {
                    if (edp.positionId) {
                        const position = await this.positionService.findOne({
                            where: { id: edp.positionId },
                        });
                        if (position?.hasManagementAuthority && edp.employeeId !== drafterId) {
                            departmentHeadEdp = edp;
                            break;
                        }
                    }
                }
            }
            if (departmentHeadEdp && departmentHeadEdp.employeeId !== drafterId) {
                const employee = await this.employeeService.findOne({
                    where: { id: departmentHeadEdp.employeeId },
                });
                const department = await this.departmentService.findOne({
                    where: { id: departmentHeadEdp.departmentId },
                });
                let positionTitle;
                if (departmentHeadEdp.positionId) {
                    const position = await this.positionService.findOne({
                        where: { id: departmentHeadEdp.positionId },
                    });
                    positionTitle = position?.positionTitle;
                }
                steps.push({
                    stepOrder,
                    stepType: 'APPROVAL',
                    isRequired: true,
                    employeeId: departmentHeadEdp.employeeId,
                    employeeName: employee?.name || '알 수 없음',
                    departmentName: department?.departmentName,
                    positionTitle,
                    assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
                });
                this.logger.debug(`단계 ${stepOrder}: 부서 ${currentDepartmentId}의 부서장 ${employee?.name} 추가`);
                stepOrder++;
            }
            const department = await this.departmentService.findOne({
                where: { id: currentDepartmentId },
            });
            if (!department?.parentDepartmentId) {
                this.logger.debug(`최상위 부서 도달. 결재선 미리보기 생성 완료`);
                break;
            }
            currentDepartmentId = department.parentDepartmentId;
            maxSteps--;
        }
        if (steps.length === 0) {
            throw new common_1.BadRequestException('결재선을 생성할 수 없습니다. 부서장이 없거나 기안자가 유일한 부서장입니다.');
        }
        this.logger.log(`자동 계층 결재선 미리보기 생성 완료: ${steps.length}단계`);
        return steps;
    }
    async resolveAssigneeRule(rule, context, stepTemplate) {
        switch (rule) {
            case approval_enum_1.AssigneeRule.FIXED:
                return this.resolveFixedUser(stepTemplate);
            case approval_enum_1.AssigneeRule.DRAFTER:
                return this.resolveDrafter(context);
            case approval_enum_1.AssigneeRule.DRAFTER_SUPERIOR:
                return this.resolveDirectManager(context);
            case approval_enum_1.AssigneeRule.DEPARTMENT_HEAD:
                return this.resolveDepartmentHead(stepTemplate, context);
            case approval_enum_1.AssigneeRule.POSITION_BASED:
                return this.resolvePositionBased(stepTemplate, context);
            default:
                this.logger.warn(`지원하지 않는 assignee_rule 타입: ${rule}`);
                return [];
        }
    }
    async resolveDrafter(context) {
        return [
            {
                employeeId: context.drafterId,
                departmentId: context.drafterDepartmentId,
            },
        ];
    }
    async resolveFixedUser(stepTemplate) {
        const employee = await this.employeeService.findOne({
            where: { id: stepTemplate.defaultApproverId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`고정 사용자를 찾을 수 없습니다: ${stepTemplate.defaultApproverId}`);
        }
        const edp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: employee.id },
        });
        return [
            {
                employeeId: employee.id,
                departmentId: edp?.departmentId,
                positionId: edp?.positionId,
            },
        ];
    }
    async resolveDirectManager(context) {
        let manager = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: context.drafterDepartmentId, isManager: true },
        });
        if (!manager) {
            const allEdps = await this.employeeDepartmentPositionService.findAll({
                where: { departmentId: context.drafterDepartmentId },
            });
            for (const edp of allEdps) {
                if (edp.positionId) {
                    const position = await this.positionService.findOne({
                        where: { id: edp.positionId },
                    });
                    if (position?.hasManagementAuthority) {
                        manager = edp;
                        break;
                    }
                }
            }
        }
        if (!manager) {
            throw new common_1.NotFoundException('직속 상관을 찾을 수 없습니다. (isManager 또는 hasManagementAuthority를 가진 직원이 없음)');
        }
        return [
            {
                employeeId: manager.employeeId,
                departmentId: manager.departmentId,
                positionId: manager.positionId,
            },
        ];
    }
    async resolveDepartmentHead(stepTemplate, context) {
        const targetDepartmentId = stepTemplate.targetDepartmentId || context.drafterDepartmentId;
        if (!targetDepartmentId) {
            throw new common_1.BadRequestException('부서 정보가 없습니다.');
        }
        let head = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: targetDepartmentId, isManager: true },
        });
        if (!head) {
            const allEdps = await this.employeeDepartmentPositionService.findAll({
                where: { departmentId: targetDepartmentId },
            });
            for (const edp of allEdps) {
                if (edp.positionId) {
                    const position = await this.positionService.findOne({
                        where: { id: edp.positionId },
                    });
                    if (position?.hasManagementAuthority) {
                        head = edp;
                        break;
                    }
                }
            }
        }
        if (!head) {
            throw new common_1.NotFoundException('부서장을 찾을 수 없습니다. (isManager 또는 hasManagementAuthority를 가진 직원이 없음)');
        }
        return [
            {
                employeeId: head.employeeId,
                departmentId: head.departmentId,
                positionId: head.positionId,
            },
        ];
    }
    async resolvePositionBased(stepTemplate, context) {
        let position;
        if (stepTemplate.targetPositionId) {
            position = await this.positionService.findOne({
                where: { id: stepTemplate.targetPositionId },
            });
        }
        if (!position) {
            throw new common_1.NotFoundException('직책을 찾을 수 없습니다.');
        }
        const edpQuery = { positionId: position.id };
        if (stepTemplate.targetDepartmentId) {
            edpQuery.departmentId = stepTemplate.targetDepartmentId;
        }
        const edp = await this.employeeDepartmentPositionService.findOne({ where: edpQuery });
        if (!edp) {
            throw new common_1.NotFoundException('해당 직책을 가진 직원을 찾을 수 없습니다.');
        }
        return [
            {
                employeeId: edp.employeeId,
                departmentId: edp.departmentId,
                positionId: edp.positionId,
            },
        ];
    }
};
exports.PreviewApprovalLineUsecase = PreviewApprovalLineUsecase;
exports.PreviewApprovalLineUsecase = PreviewApprovalLineUsecase = PreviewApprovalLineUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_service_1.DomainFormService,
        form_version_service_1.DomainFormVersionService,
        approval_line_template_service_1.DomainApprovalLineTemplateService,
        approval_line_template_version_service_1.DomainApprovalLineTemplateVersionService,
        approval_step_template_service_1.DomainApprovalStepTemplateService,
        form_version_approval_line_template_version_service_1.DomainFormVersionApprovalLineTemplateVersionService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], PreviewApprovalLineUsecase);
//# sourceMappingURL=preview-approval-line.usecase.js.map