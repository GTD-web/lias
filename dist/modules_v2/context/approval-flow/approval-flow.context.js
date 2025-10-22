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
var ApprovalFlowContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFlowContext = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const form_service_1 = require("../../domain/form/form.service");
const form_version_service_1 = require("../../domain/form/form-version.service");
const approval_line_template_service_1 = require("../../domain/approval-line-template/approval-line-template.service");
const approval_line_template_version_service_1 = require("../../domain/approval-line-template/approval-line-template-version.service");
const approval_step_template_service_1 = require("../../domain/approval-step-template/approval-step-template.service");
const approval_line_snapshot_service_1 = require("../../domain/approval-line-snapshot/approval-line-snapshot.service");
const approval_step_snapshot_service_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.service");
const form_version_approval_line_template_version_service_1 = require("../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const position_service_1 = require("../../domain/position/position.service");
const employee_department_position_service_1 = require("../../domain/employee-department-position/employee-department-position.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const transaction_util_1 = require("../../../common/utils/transaction.util");
let ApprovalFlowContext = ApprovalFlowContext_1 = class ApprovalFlowContext {
    constructor(dataSource, formService, formVersionService, approvalLineTemplateService, approvalLineTemplateVersionService, approvalStepTemplateService, approvalLineSnapshotService, approvalStepSnapshotService, formVersionApprovalLineTemplateVersionService, employeeService, departmentService, positionService, employeeDepartmentPositionService) {
        this.dataSource = dataSource;
        this.formService = formService;
        this.formVersionService = formVersionService;
        this.approvalLineTemplateService = approvalLineTemplateService;
        this.approvalLineTemplateVersionService = approvalLineTemplateVersionService;
        this.approvalStepTemplateService = approvalStepTemplateService;
        this.approvalLineSnapshotService = approvalLineSnapshotService;
        this.approvalStepSnapshotService = approvalStepSnapshotService;
        this.formVersionApprovalLineTemplateVersionService = formVersionApprovalLineTemplateVersionService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.logger = new common_1.Logger(ApprovalFlowContext_1.name);
    }
    async createFormWithApprovalLine(dto, externalQueryRunner) {
        this.logger.log(`문서양식 생성 시작: ${dto.formName}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const formEntity = await this.formService.create({
                name: dto.formName,
                code: dto.formCode,
                description: dto.description,
                status: approval_enum_1.FormStatus.ACTIVE,
            }, { queryRunner });
            const form = await this.formService.save(formEntity, { queryRunner });
            this.logger.debug(`Form 생성 완료: ${form.id}`);
            const formVersionEntity = await this.formVersionService.create({
                formId: form.id,
                versionNo: 1,
                template: dto.template || '',
                isActive: true,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const formVersion = await this.formVersionService.save(formVersionEntity, { queryRunner });
            this.logger.debug(`FormVersion 생성 완료: ${formVersion.id}`);
            let lineTemplateVersionId;
            if (dto.useExistingLine !== undefined) {
                if (dto.useExistingLine) {
                    if (!dto.lineTemplateVersionId) {
                        throw new common_1.BadRequestException('기존 결재선을 사용하려면 lineTemplateVersionId가 필요합니다.');
                    }
                    const templateVersion = await this.approvalLineTemplateVersionService.findOne({
                        where: { id: dto.lineTemplateVersionId },
                        queryRunner,
                    });
                    if (!templateVersion) {
                        throw new common_1.NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다: ${dto.lineTemplateVersionId}`);
                    }
                    lineTemplateVersionId = dto.lineTemplateVersionId;
                    this.logger.debug(`기존 결재선 템플릿 버전 사용: ${lineTemplateVersionId}`);
                }
                else {
                    if (!dto.baseLineTemplateVersionId) {
                        throw new common_1.BadRequestException('복제하려면 baseLineTemplateVersionId가 필요합니다.');
                    }
                    const clonedVersion = await this.cloneApprovalLineTemplateVersion({
                        baseTemplateVersionId: dto.baseLineTemplateVersionId,
                        newTemplateName: `${dto.formName} 전용 결재선`,
                        stepEdits: dto.stepEdits,
                        createdBy: dto.createdBy,
                    }, queryRunner);
                    lineTemplateVersionId = clonedVersion.id;
                    this.logger.debug(`결재선 템플릿 복제 완료: ${lineTemplateVersionId}`);
                }
                const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create({
                    formVersionId: formVersion.id,
                    approvalLineTemplateVersionId: lineTemplateVersionId,
                    isDefault: true,
                }, { queryRunner });
                await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });
            }
            else {
                this.logger.debug(`결재선 없이 문서양식 생성 (제출 시 자동 계층 결재선 생성)`);
            }
            form.currentVersionId = formVersion.id;
            await this.formService.save(form, { queryRunner });
            this.logger.log(`문서양식 생성 완료: ${form.id}`);
            return { form, formVersion, lineTemplateVersionId };
        }, externalQueryRunner);
    }
    async updateFormVersion(dto, externalQueryRunner) {
        this.logger.log(`문서양식 수정 시작: ${dto.formId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const form = await this.formService.findOne({ where: { id: dto.formId }, queryRunner });
            if (!form) {
                throw new common_1.NotFoundException(`Form을 찾을 수 없습니다: ${dto.formId}`);
            }
            const currentVersion = await this.formVersionService.findOne({
                where: { id: form.currentVersionId },
                queryRunner,
            });
            if (!currentVersion) {
                throw new common_1.NotFoundException(`현재 FormVersion을 찾을 수 없습니다.`);
            }
            const newVersionEntity = await this.formVersionService.create({
                formId: form.id,
                versionNo: currentVersion.versionNo + 1,
                template: dto.template || currentVersion.template,
                isActive: true,
                changeReason: dto.versionNote,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const newVersion = await this.formVersionService.save(newVersionEntity, { queryRunner });
            this.logger.debug(`새 FormVersion 생성: v${newVersion.versionNo}`);
            currentVersion.isActive = false;
            const updatedCurrentVersion = await this.formVersionService.save(currentVersion, { queryRunner });
            let lineTemplateVersionId;
            if (dto.lineTemplateVersionId) {
                if (dto.cloneAndEdit && dto.baseLineTemplateVersionId) {
                    const clonedVersion = await this.cloneApprovalLineTemplateVersion({
                        baseTemplateVersionId: dto.baseLineTemplateVersionId,
                        stepEdits: dto.stepEdits,
                        createdBy: dto.createdBy,
                    }, queryRunner);
                    lineTemplateVersionId = clonedVersion.id;
                }
                else {
                    lineTemplateVersionId = dto.lineTemplateVersionId;
                }
                const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create({
                    formVersionId: newVersion.id,
                    approvalLineTemplateVersionId: lineTemplateVersionId,
                    isDefault: true,
                }, { queryRunner });
                await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });
            }
            else {
                const oldLinks = await this.formVersionApprovalLineTemplateVersionService.findAll({
                    where: { formVersionId: currentVersion.id },
                    queryRunner,
                });
                for (const oldLink of oldLinks) {
                    const newLinkEntity = await this.formVersionApprovalLineTemplateVersionService.create({
                        formVersionId: newVersion.id,
                        approvalLineTemplateVersionId: oldLink.approvalLineTemplateVersionId,
                        isDefault: oldLink.isDefault,
                    }, { queryRunner });
                    await this.formVersionApprovalLineTemplateVersionService.save(newLinkEntity, { queryRunner });
                }
            }
            form.currentVersionId = newVersion.id;
            await this.formService.save(form, { queryRunner });
            this.logger.log(`문서양식 수정 완료: v${newVersion.versionNo}`);
            return { form, newVersion };
        }, externalQueryRunner);
    }
    async cloneApprovalLineTemplateVersion(dto, externalQueryRunner) {
        this.logger.log(`결재선 템플릿 복제 시작`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const baseVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: dto.baseTemplateVersionId },
                queryRunner,
            });
            if (!baseVersion) {
                throw new common_1.NotFoundException(`원본 결재선 템플릿 버전을 찾을 수 없습니다: ${dto.baseTemplateVersionId}`);
            }
            const baseTemplate = await this.approvalLineTemplateService.findOne({
                where: { id: baseVersion.templateId },
                queryRunner,
            });
            if (!baseTemplate) {
                throw new common_1.NotFoundException(`원본 결재선 템플릿을 찾을 수 없습니다.`);
            }
            let targetTemplate = baseTemplate;
            let newVersionNo = 1;
            if (dto.newTemplateName) {
                const targetTemplateEntity = await this.approvalLineTemplateService.create({
                    name: dto.newTemplateName,
                    type: baseTemplate.type,
                    orgScope: baseTemplate.orgScope,
                    departmentId: baseTemplate.departmentId,
                    status: approval_enum_1.ApprovalLineTemplateStatus.ACTIVE,
                    createdBy: dto.createdBy,
                }, { queryRunner });
                targetTemplate = await this.approvalLineTemplateService.save(targetTemplateEntity, { queryRunner });
                this.logger.debug(`새 결재선 템플릿 생성: ${targetTemplate.id}`);
            }
            else {
                newVersionNo = baseVersion.versionNo + 1;
            }
            const newVersionEntity = await this.approvalLineTemplateVersionService.create({
                templateId: targetTemplate.id,
                versionNo: newVersionNo,
                isActive: true,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const newVersion = await this.approvalLineTemplateVersionService.save(newVersionEntity, {
                queryRunner,
            });
            this.logger.debug(`새 결재선 템플릿 버전 생성: v${newVersionNo}`);
            const baseSteps = await this.approvalStepTemplateService.findAll({
                where: { lineTemplateVersionId: baseVersion.id },
                order: { stepOrder: 'ASC' },
                queryRunner,
            });
            for (const baseStep of baseSteps) {
                const edit = dto.stepEdits?.find((e) => e.stepOrder === baseStep.stepOrder);
                const newStepEntity = await this.approvalStepTemplateService.create({
                    lineTemplateVersionId: newVersion.id,
                    stepOrder: baseStep.stepOrder,
                    stepType: edit?.stepType ?? baseStep.stepType,
                    assigneeRule: edit?.assigneeRule || baseStep.assigneeRule,
                    targetDepartmentId: edit?.targetDepartmentId || baseStep.targetDepartmentId,
                    targetPositionId: edit?.targetPositionId || baseStep.targetPositionId,
                    defaultApproverId: edit?.targetEmployeeId || baseStep.defaultApproverId,
                    required: edit?.isRequired !== undefined ? edit.isRequired : baseStep.required,
                }, { queryRunner });
                await this.approvalStepTemplateService.save(newStepEntity, { queryRunner });
            }
            if (dto.stepEdits) {
                const existingOrders = baseSteps.map((s) => s.stepOrder);
                const newSteps = dto.stepEdits.filter((e) => !existingOrders.includes(e.stepOrder));
                for (const newStepDto of newSteps) {
                    const newStepEntity = await this.approvalStepTemplateService.create({
                        lineTemplateVersionId: newVersion.id,
                        stepOrder: newStepDto.stepOrder,
                        stepType: newStepDto.stepType,
                        assigneeRule: newStepDto.assigneeRule,
                        targetDepartmentId: newStepDto.targetDepartmentId,
                        targetPositionId: newStepDto.targetPositionId,
                        defaultApproverId: newStepDto.targetEmployeeId,
                        required: newStepDto.isRequired,
                    }, { queryRunner });
                    await this.approvalStepTemplateService.save(newStepEntity, { queryRunner });
                }
            }
            targetTemplate.currentVersionId = newVersion.id;
            await this.approvalLineTemplateService.save(targetTemplate, { queryRunner });
            this.logger.log(`결재선 템플릿 복제 완료: ${newVersion.id}`);
            return newVersion;
        }, externalQueryRunner);
    }
    async createApprovalLineTemplateVersion(dto, externalQueryRunner) {
        this.logger.log(`결재선 템플릿 새 버전 생성 시작`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const template = await this.approvalLineTemplateService.findOne({
                where: { id: dto.templateId },
                queryRunner,
            });
            if (!template) {
                throw new common_1.NotFoundException(`결재선 템플릿을 찾을 수 없습니다: ${dto.templateId}`);
            }
            const currentVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: template.currentVersionId },
                queryRunner,
            });
            if (!currentVersion) {
                throw new common_1.NotFoundException(`현재 템플릿 버전을 찾을 수 없습니다.`);
            }
            const newVersionEntity = await this.approvalLineTemplateVersionService.create({
                templateId: template.id,
                versionNo: currentVersion.versionNo + 1,
                isActive: true,
                changeReason: dto.versionNote,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const newVersion = await this.approvalLineTemplateVersionService.save(newVersionEntity, {
                queryRunner,
            });
            currentVersion.isActive = false;
            const updatedCurrentVersion = await this.approvalLineTemplateVersionService.save(currentVersion, {
                queryRunner,
            });
            for (const stepDto of dto.steps) {
                const stepEntity = await this.approvalStepTemplateService.create({
                    lineTemplateVersionId: newVersion.id,
                    stepOrder: stepDto.stepOrder,
                    stepType: stepDto.stepType,
                    assigneeRule: stepDto.assigneeRule,
                    targetDepartmentId: stepDto.targetDepartmentId,
                    targetPositionId: stepDto.targetPositionId,
                    defaultApproverId: stepDto.targetEmployeeId,
                    required: stepDto.isRequired,
                }, { queryRunner });
                await this.approvalStepTemplateService.save(stepEntity, { queryRunner });
            }
            template.currentVersionId = newVersion.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });
            this.logger.log(`결재선 템플릿 새 버전 생성 완료: v${newVersion.versionNo}`);
            return newVersion;
        }, externalQueryRunner);
    }
    async createApprovalLineTemplate(dto, externalQueryRunner) {
        this.logger.log(`새 결재선 템플릿 생성 시작: ${dto.name}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const templateEntity = await this.approvalLineTemplateService.create({
                name: dto.name,
                description: dto.description,
                type: dto.type,
                orgScope: dto.orgScope,
                departmentId: dto.departmentId,
                status: approval_enum_1.ApprovalLineTemplateStatus.ACTIVE,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });
            this.logger.debug(`결재선 템플릿 생성 완료: ${template.id}`);
            const versionEntity = await this.approvalLineTemplateVersionService.create({
                templateId: template.id,
                versionNo: 1,
                isActive: true,
                createdBy: dto.createdBy,
            }, { queryRunner });
            const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });
            this.logger.debug(`결재선 템플릿 버전 생성 완료: v1`);
            for (const stepDto of dto.steps) {
                const stepEntity = await this.approvalStepTemplateService.create({
                    lineTemplateVersionId: version.id,
                    stepOrder: stepDto.stepOrder,
                    stepType: stepDto.stepType,
                    assigneeRule: stepDto.assigneeRule,
                    targetDepartmentId: stepDto.targetDepartmentId,
                    targetPositionId: stepDto.targetPositionId,
                    defaultApproverId: stepDto.targetEmployeeId,
                    required: stepDto.isRequired,
                }, { queryRunner });
                await this.approvalStepTemplateService.save(stepEntity, { queryRunner });
            }
            template.currentVersionId = version.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });
            this.logger.log(`새 결재선 템플릿 생성 완료: ${template.id}`);
            return { template, version };
        }, externalQueryRunner);
    }
    async createHierarchicalApprovalLine(drafterId, drafterDepartmentId, queryRunner) {
        this.logger.log(`자동 계층적 결재선 생성 시작 (기안자: ${drafterId}, 부서: ${drafterDepartmentId})`);
        const approvers = [];
        let stepOrder = 1;
        const drafterEdp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: drafterId, departmentId: drafterDepartmentId },
            queryRunner,
        });
        approvers.push({
            employeeId: drafterId,
            departmentId: drafterDepartmentId,
            positionId: drafterEdp?.positionId,
            stepOrder,
            stepType: approval_enum_1.ApprovalStepType.APPROVAL,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            isRequired: true,
        });
        this.logger.debug(`${stepOrder}단계 추가: 기안자 (${drafterId})`);
        stepOrder++;
        let currentDepartmentId = drafterDepartmentId;
        let maxSteps = 10;
        while (currentDepartmentId && maxSteps > 0) {
            const headEdp = await this.employeeDepartmentPositionService.findOne({
                where: { departmentId: currentDepartmentId, isManager: true },
                queryRunner,
            });
            let departmentHead = headEdp;
            if (!departmentHead) {
                const allEdps = await this.employeeDepartmentPositionService.findAll({
                    where: { departmentId: currentDepartmentId },
                    queryRunner,
                });
                for (const edp of allEdps) {
                    if (edp.positionId) {
                        const position = await this.positionService.findOne({
                            where: { id: edp.positionId },
                            queryRunner,
                        });
                        if (position?.hasManagementAuthority && edp.employeeId !== drafterId) {
                            departmentHead = edp;
                            break;
                        }
                    }
                }
            }
            if (departmentHead && departmentHead.employeeId !== drafterId) {
                approvers.push({
                    employeeId: departmentHead.employeeId,
                    departmentId: departmentHead.departmentId,
                    positionId: departmentHead.positionId,
                    stepOrder,
                    stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                    assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
                    isRequired: true,
                });
                this.logger.debug(`${stepOrder}단계 추가: 부서 ${currentDepartmentId}의 부서장 (${departmentHead.employeeId})`);
                stepOrder++;
            }
            const department = await this.departmentService.findOne({
                where: { id: currentDepartmentId },
                queryRunner,
            });
            if (!department?.parentDepartmentId) {
                this.logger.debug(`최상위 부서 도달. 결재선 생성 완료`);
                break;
            }
            currentDepartmentId = department.parentDepartmentId;
            maxSteps--;
        }
        if (approvers.length === 0) {
            throw new common_1.BadRequestException('결재선을 생성할 수 없습니다. 부서장이 없거나 기안자가 유일한 부서장입니다.');
        }
        this.logger.log(`자동 계층적 결재선 생성 완료: ${approvers.length}단계`);
        return approvers;
    }
    async createApprovalSnapshot(dto, externalQueryRunner) {
        this.logger.log(`결재 스냅샷 생성 시작: Document ${dto.documentId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const formVersion = await this.formVersionService.findOne({
                where: { id: dto.formVersionId },
                queryRunner,
            });
            if (!formVersion) {
                throw new common_1.NotFoundException(`FormVersion을 찾을 수 없습니다: ${dto.formVersionId}`);
            }
            const link = await this.formVersionApprovalLineTemplateVersionService.findOne({
                where: { formVersionId: formVersion.id, isDefault: true },
                queryRunner,
            });
            let resolvedApprovers = [];
            if (!link) {
                this.logger.warn(`FormVersion ${formVersion.id}에 연결된 결재선 템플릿이 없습니다. 자동 계층적 결재선을 생성합니다.`);
                if (!dto.draftContext.drafterDepartmentId) {
                    throw new common_1.BadRequestException('결재선 템플릿이 없고, 기안자의 부서 정보도 없습니다. drafterDepartmentId를 제공해주세요.');
                }
                resolvedApprovers = await this.createHierarchicalApprovalLine(dto.draftContext.drafterId, dto.draftContext.drafterDepartmentId, queryRunner);
            }
            else {
                const lineTemplateVersion = await this.approvalLineTemplateVersionService.findOne({
                    where: { id: link.approvalLineTemplateVersionId },
                    queryRunner,
                });
                if (!lineTemplateVersion) {
                    throw new common_1.NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다.`);
                }
                const stepTemplates = await this.approvalStepTemplateService.findAll({
                    where: { lineTemplateVersionId: lineTemplateVersion.id },
                    order: { stepOrder: 'ASC' },
                    queryRunner,
                });
                for (const stepTemplate of stepTemplates) {
                    const approvers = await this.resolveAssigneeRule(stepTemplate.assigneeRule, dto.draftContext, stepTemplate, queryRunner);
                    resolvedApprovers.push(...approvers.map((approver) => ({
                        ...approver,
                        stepOrder: stepTemplate.stepOrder,
                        stepType: stepTemplate.stepType,
                        assigneeRule: stepTemplate.assigneeRule,
                        isRequired: stepTemplate.required,
                    })));
                }
            }
            if (resolvedApprovers.length === 0) {
                throw new common_1.BadRequestException('결재선을 구성할 수 없습니다. 결재자가 없습니다.');
            }
            const snapshotEntity = await this.approvalLineSnapshotService.create({
                documentId: dto.documentId,
                sourceTemplateVersionId: link?.approvalLineTemplateVersionId || null,
                snapshotName: link ? '결재선 스냅샷' : '자동 생성 결재선',
                snapshotDescription: link ? undefined : '부서 계층에 따른 자동 생성 결재선',
                frozenAt: new Date(),
            }, { queryRunner });
            const snapshot = await this.approvalLineSnapshotService.save(snapshotEntity, { queryRunner });
            for (const resolved of resolvedApprovers) {
                const stepSnapshotEntity = await this.approvalStepSnapshotService.create({
                    snapshotId: snapshot.id,
                    stepOrder: resolved.stepOrder,
                    stepType: resolved.stepType,
                    assigneeRule: resolved.assigneeRule,
                    approverId: resolved.employeeId,
                    approverDepartmentId: resolved.departmentId,
                    approverPositionId: resolved.positionId,
                    required: resolved.isRequired,
                    status: approval_enum_1.ApprovalStatus.PENDING,
                }, { queryRunner });
                await this.approvalStepSnapshotService.save(stepSnapshotEntity, { queryRunner });
            }
            this.logger.log(`결재 스냅샷 생성 완료: ${snapshot.id} (${resolvedApprovers.length}개 단계)`);
            return snapshot;
        }, externalQueryRunner);
    }
    async resolveAssigneeRule(rule, context, stepTemplate, queryRunner) {
        if (!rule) {
            this.logger.warn('assignee_rule이 없거나 유효하지 않습니다.');
            return [];
        }
        const ruleType = rule;
        switch (ruleType) {
            case approval_enum_1.AssigneeRule.FIXED:
                return this.resolveFixedUser(stepTemplate, queryRunner);
            case approval_enum_1.AssigneeRule.DRAFTER:
                return this.resolveDrafter(context, queryRunner);
            case approval_enum_1.AssigneeRule.DRAFTER_SUPERIOR:
                return this.resolveDirectManager(context, queryRunner);
            case approval_enum_1.AssigneeRule.DEPARTMENT_HEAD:
                return this.resolveDepartmentHead(stepTemplate, context, queryRunner);
            case approval_enum_1.AssigneeRule.POSITION_BASED:
                return this.resolvePositionBased(stepTemplate, context, queryRunner);
            default:
                this.logger.warn(`지원하지 않는 assignee_rule 타입: ${ruleType}`);
                return [];
        }
    }
    async resolveDrafter(context, queryRunner) {
        return [
            {
                employeeId: context.drafterId,
                departmentId: context.drafterDepartmentId,
            },
        ];
    }
    async resolveFixedUser(stepTemplate, queryRunner) {
        const rule = { userId: stepTemplate.defaultApproverId };
        const employee = await this.employeeService.findOne({ where: { id: rule.userId }, queryRunner });
        if (!employee) {
            throw new common_1.NotFoundException(`고정 사용자를 찾을 수 없습니다: ${rule.userId}`);
        }
        const edp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: employee.id },
            queryRunner,
        });
        return [
            {
                employeeId: employee.id,
                departmentId: edp?.departmentId,
                positionId: edp?.positionId,
            },
        ];
    }
    async resolveDirectManager(context, queryRunner) {
        if (!context.drafterDepartmentId) {
            throw new common_1.BadRequestException('기안자의 부서 정보가 없습니다.');
        }
        let manager = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: context.drafterDepartmentId, isManager: true },
            queryRunner,
        });
        if (!manager) {
            const allEdps = await this.employeeDepartmentPositionService.findAll({
                where: { departmentId: context.drafterDepartmentId },
                queryRunner,
            });
            for (const edp of allEdps) {
                if (edp.positionId) {
                    const position = await this.positionService.findOne({
                        where: { id: edp.positionId },
                        queryRunner,
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
    async resolveManagerChain(context, depth, queryRunner) {
        const managers = [];
        let currentDepartmentId = context.drafterDepartmentId;
        for (let i = 0; i < depth; i++) {
            if (!currentDepartmentId)
                break;
            const manager = await this.employeeDepartmentPositionService.findOne({
                where: { departmentId: currentDepartmentId, isManager: true },
                queryRunner,
            });
            if (manager) {
                managers.push({
                    employeeId: manager.employeeId,
                    departmentId: manager.departmentId,
                    positionId: manager.positionId,
                });
            }
            const dept = await this.departmentService.findOne({ where: { id: currentDepartmentId }, queryRunner });
            currentDepartmentId = dept?.parentDepartmentId;
        }
        return managers;
    }
    async resolveDepartmentHead(stepTemplate, context, queryRunner) {
        const rule = { departmentId: stepTemplate.targetDepartmentId };
        const targetDepartmentId = rule.departmentId || context.drafterDepartmentId;
        if (!targetDepartmentId) {
            throw new common_1.BadRequestException('부서 정보가 없습니다.');
        }
        let head = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: targetDepartmentId, isManager: true },
            queryRunner,
        });
        if (!head) {
            const allEdps = await this.employeeDepartmentPositionService.findAll({
                where: { departmentId: targetDepartmentId },
                queryRunner,
            });
            for (const edp of allEdps) {
                if (edp.positionId) {
                    const position = await this.positionService.findOne({
                        where: { id: edp.positionId },
                        queryRunner,
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
    async resolvePositionBased(stepTemplate, context, queryRunner) {
        const rule = {
            positionId: stepTemplate.targetPositionId,
            departmentId: stepTemplate.targetDepartmentId,
        };
        let position;
        if (rule.positionId) {
            position = await this.positionService.findOne({ where: { id: rule.positionId }, queryRunner });
        }
        else if (rule.positionCode) {
            position = await this.positionService.findOne({ where: { positionCode: rule.positionCode }, queryRunner });
        }
        if (!position) {
            throw new common_1.NotFoundException('직책을 찾을 수 없습니다.');
        }
        const edpQuery = { positionId: position.id };
        if (rule.departmentId) {
            edpQuery.departmentId = rule.departmentId;
        }
        const edp = await this.employeeDepartmentPositionService.findOne({ where: edpQuery, queryRunner });
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
    async resolveAmountBased(rule, context, queryRunner) {
        const amount = context.documentAmount || 0;
        const threshold = rule.thresholds.find((t) => amount <= t.max);
        if (!threshold) {
            throw new common_1.BadRequestException('금액에 해당하는 결재자를 찾을 수 없습니다.');
        }
        if (threshold.userId) {
            return this.resolveFixedUser({ userId: threshold.userId }, queryRunner);
        }
        else if (threshold.positionCode) {
            return this.resolvePositionBased({ positionCode: threshold.positionCode }, context, queryRunner);
        }
        return [];
    }
    async getApprovalLineTemplates(type) {
        this.logger.debug(`결재선 템플릿 목록 조회: type=${type}`);
        const templates = await this.approvalLineTemplateService.findAll();
        if (type) {
            return templates.filter((t) => t.type === type);
        }
        return templates;
    }
    async getApprovalLineTemplateVersion(templateId, versionId) {
        this.logger.debug(`결재선 템플릿 버전 조회: templateId=${templateId}, versionId=${versionId}`);
        return await this.approvalLineTemplateVersionService.findByVersionId(versionId);
    }
    async getForms() {
        this.logger.debug('문서양식 목록 조회');
        return await this.formService.findAll();
    }
    async getFormVersion(formId, versionId) {
        this.logger.debug(`문서양식 버전 조회: formId=${formId}, versionId=${versionId}`);
        const formVersion = await this.formVersionService.findByFormVersionId(versionId);
        const mappings = await this.formVersionApprovalLineTemplateVersionService.findAll({
            where: { formVersionId: versionId },
        });
        let approvalLineInfo = null;
        if (mappings && mappings.length > 0) {
            const defaultMapping = mappings.find((m) => m.isDefault) || mappings[0];
            const templateVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: defaultMapping.approvalLineTemplateVersionId },
            });
            if (templateVersion) {
                const template = await this.approvalLineTemplateService.findOne({
                    where: { id: templateVersion.templateId },
                });
                const steps = await this.approvalStepTemplateService.findAll({
                    where: { lineTemplateVersionId: templateVersion.id },
                    order: { stepOrder: 'ASC' },
                });
                approvalLineInfo = {
                    template,
                    templateVersion,
                    steps,
                };
            }
        }
        return {
            ...formVersion,
            approvalLineInfo,
        };
    }
    async getApprovalLineTemplateById(templateId) {
        this.logger.debug(`결재선 템플릿 조회: templateId=${templateId}`);
        return await this.approvalLineTemplateService.findByTemplateId(templateId);
    }
    async getFormById(formId) {
        this.logger.debug(`문서양식 조회: formId=${formId}`);
        return await this.formService.findByFormId(formId);
    }
};
exports.ApprovalFlowContext = ApprovalFlowContext;
exports.ApprovalFlowContext = ApprovalFlowContext = ApprovalFlowContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        form_service_1.DomainFormService,
        form_version_service_1.DomainFormVersionService,
        approval_line_template_service_1.DomainApprovalLineTemplateService,
        approval_line_template_version_service_1.DomainApprovalLineTemplateVersionService,
        approval_step_template_service_1.DomainApprovalStepTemplateService,
        approval_line_snapshot_service_1.DomainApprovalLineSnapshotService,
        approval_step_snapshot_service_1.DomainApprovalStepSnapshotService,
        form_version_approval_line_template_version_service_1.DomainFormVersionApprovalLineTemplateVersionService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], ApprovalFlowContext);
//# sourceMappingURL=approval-flow.context.js.map