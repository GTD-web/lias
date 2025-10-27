import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainFormService } from '../../domain/form/form.service';
import { DomainFormVersionService } from '../../domain/form/form-version.service';
import { DomainApprovalLineTemplateService } from '../../domain/approval-line-template/approval-line-template.service';
import { DomainApprovalLineTemplateVersionService } from '../../domain/approval-line-template/approval-line-template-version.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainApprovalLineSnapshotService } from '../../domain/approval-line-snapshot/approval-line-snapshot.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainFormVersionApprovalLineTemplateVersionService } from '../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import {
    CreateFormWithApprovalLineDto,
    UpdateFormVersionDto,
    CloneApprovalLineTemplateDto,
    CreateApprovalLineTemplateVersionDto,
    CreateApprovalLineTemplateDto,
    StepEditDto,
} from './dtos/form-approval-line.dto';
import { CreateSnapshotDto, DraftContextDto, ResolvedApproverDto } from './dtos/draft-context.dto';
import { AssigneeRule as AssigneeRuleInterface, AssigneeRuleType } from './interfaces/assignee-rule.interface';
import {
    FormStatus,
    ApprovalLineTemplateStatus,
    ApprovalStepType,
    ApprovalStatus,
    AssigneeRule,
} from '../../../common/enums/approval.enum';
import { withTransaction } from '../../../common/utils/transaction.util';

/**
 * 결재 흐름 컨텍스트
 *
 * 역할:
 * - 문서양식과 결재선 템플릿의 생성/수정/버전 관리
 * - 결재선 템플릿 복제 (Detach & Clone)
 * - 기안 시 assignee_rule 해석 및 스냅샷 생성
 * - 참조(공유) → 복제(분기) → 버전관리의 3단 구조 구현
 */
@Injectable()
export class ApprovalFlowContext {
    private readonly logger = new Logger(ApprovalFlowContext.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly formService: DomainFormService,
        private readonly formVersionService: DomainFormVersionService,
        private readonly approvalLineTemplateService: DomainApprovalLineTemplateService,
        private readonly approvalLineTemplateVersionService: DomainApprovalLineTemplateVersionService,
        private readonly approvalStepTemplateService: DomainApprovalStepTemplateService,
        private readonly approvalLineSnapshotService: DomainApprovalLineSnapshotService,
        private readonly approvalStepSnapshotService: DomainApprovalStepSnapshotService,
        private readonly formVersionApprovalLineTemplateVersionService: DomainFormVersionApprovalLineTemplateVersionService,
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly positionService: DomainPositionService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    /**
     * 1. 문서양식 생성 & 결재선 연결
     *
     * 전략:
     * - useExistingLine=true: 기존 템플릿 버전 참조
     * - useExistingLine=false: 템플릿 복제 후 수정하여 새로운 분기 생성
     */
    async createFormWithApprovalLine(dto: CreateFormWithApprovalLineDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서양식 생성 시작: ${dto.formName}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Form 생성
                const formEntity = await this.formService.create(
                    {
                        name: dto.formName,
                        code: dto.formCode,
                        description: dto.description,
                        status: FormStatus.ACTIVE,
                    },
                    { queryRunner },
                );
                const form = await this.formService.save(formEntity, { queryRunner });
                this.logger.debug(`Form 생성 완료: ${form.id}`);

                // 2) FormVersion v1 생성
                const formVersionEntity = await this.formVersionService.create(
                    {
                        formId: form.id,
                        versionNo: 1,
                        template: dto.template || '', // 사용자 입력 템플릿 또는 빈 템플릿
                        isActive: true,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const formVersion = await this.formVersionService.save(formVersionEntity, { queryRunner });
                this.logger.debug(`FormVersion 생성 완료: ${formVersion.id}`);

                // 3) 결재선 연결 (선택사항)
                let lineTemplateVersionId: string | undefined;
                if (dto.useExistingLine !== undefined) {
                    if (dto.useExistingLine) {
                        // 기존 템플릿 버전 참조
                        if (!dto.lineTemplateVersionId) {
                            throw new BadRequestException(
                                '기존 결재선을 사용하려면 lineTemplateVersionId가 필요합니다.',
                            );
                        }

                        // 템플릿 버전 존재 여부 검증
                        const templateVersion = await this.approvalLineTemplateVersionService.findOne({
                            where: { id: dto.lineTemplateVersionId },
                            queryRunner,
                        });
                        if (!templateVersion) {
                            throw new NotFoundException(
                                `결재선 템플릿 버전을 찾을 수 없습니다: ${dto.lineTemplateVersionId}`,
                            );
                        }

                        lineTemplateVersionId = dto.lineTemplateVersionId;
                        this.logger.debug(`기존 결재선 템플릿 버전 사용: ${lineTemplateVersionId}`);
                    } else {
                        // 복제 후 수정 (Detach & Clone)
                        if (!dto.baseLineTemplateVersionId) {
                            throw new BadRequestException('복제하려면 baseLineTemplateVersionId가 필요합니다.');
                        }
                        const clonedVersion = await this.cloneApprovalLineTemplateVersion(
                            {
                                baseTemplateVersionId: dto.baseLineTemplateVersionId,
                                newTemplateName: `${dto.formName} 전용 결재선`,
                                stepEdits: dto.stepEdits,
                                createdBy: dto.createdBy,
                            },
                            queryRunner,
                        );
                        lineTemplateVersionId = clonedVersion.id;
                        this.logger.debug(`결재선 템플릿 복제 완료: ${lineTemplateVersionId}`);
                    }

                    // 4) FormVersion과 ApprovalLineTemplateVersion 연결
                    const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create(
                        {
                            formVersionId: formVersion.id,
                            approvalLineTemplateVersionId: lineTemplateVersionId,
                            isDefault: true,
                        },
                        { queryRunner },
                    );
                    await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });
                } else {
                    // useExistingLine이 undefined면 결재선 없이 생성 (문서 제출 시 자동 생성됨)
                    this.logger.debug(`결재선 없이 문서양식 생성 (제출 시 자동 계층 결재선 생성)`);
                }

                // 5) Form의 current_version_id 업데이트
                form.currentVersionId = formVersion.id;
                await this.formService.save(form, { queryRunner });

                this.logger.log(`문서양식 생성 완료: ${form.id}`);
                return { form, formVersion, lineTemplateVersionId };
            },
            externalQueryRunner,
        );
    }

    /**
     * 2. 문서양식 수정 (새 버전 생성)
     *
     * 전략:
     * - 기존 FormVersion은 불변 유지
     * - 새 FormVersion 생성 및 결재선 재연결
     */
    async updateFormVersion(dto: UpdateFormVersionDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서양식 수정 시작: ${dto.formId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) 기존 Form 조회
                const form = await this.formService.findOne({ where: { id: dto.formId }, queryRunner });
                if (!form) {
                    throw new NotFoundException(`Form을 찾을 수 없습니다: ${dto.formId}`);
                }

                // 2) 현재 버전 조회
                const currentVersion = await this.formVersionService.findOne({
                    where: { id: form.currentVersionId },
                    queryRunner,
                });
                if (!currentVersion) {
                    throw new NotFoundException(`현재 FormVersion을 찾을 수 없습니다.`);
                }

                // 3) 새 FormVersion 생성
                const newVersionEntity = await this.formVersionService.create(
                    {
                        formId: form.id,
                        versionNo: currentVersion.versionNo + 1,
                        template: dto.template || currentVersion.template,
                        isActive: true,
                        changeReason: dto.versionNote,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const newVersion = await this.formVersionService.save(newVersionEntity, { queryRunner });
                this.logger.debug(`새 FormVersion 생성: v${newVersion.versionNo}`);

                // 4) 기존 버전 비활성화
                currentVersion.isActive = false;
                const updatedCurrentVersion = await this.formVersionService.save(currentVersion, { queryRunner });

                // 5) 결재선 연결
                let lineTemplateVersionId: string;

                if (dto.lineTemplateVersionId) {
                    if (dto.cloneAndEdit && dto.baseLineTemplateVersionId) {
                        // 복제 후 수정
                        const clonedVersion = await this.cloneApprovalLineTemplateVersion(
                            {
                                baseTemplateVersionId: dto.baseLineTemplateVersionId,
                                stepEdits: dto.stepEdits,
                                createdBy: dto.createdBy,
                            },
                            queryRunner,
                        );
                        lineTemplateVersionId = clonedVersion.id;
                    } else {
                        // 기존 템플릿 버전 참조
                        lineTemplateVersionId = dto.lineTemplateVersionId;
                    }

                    const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create(
                        {
                            formVersionId: newVersion.id,
                            approvalLineTemplateVersionId: lineTemplateVersionId,
                            isDefault: true,
                        },
                        { queryRunner },
                    );
                    await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });
                } else {
                    // 결재선 변경 없으면 기존 연결 복사
                    const oldLinks = await this.formVersionApprovalLineTemplateVersionService.findAll({
                        where: { formVersionId: currentVersion.id },
                        queryRunner,
                    });
                    for (const oldLink of oldLinks) {
                        const newLinkEntity = await this.formVersionApprovalLineTemplateVersionService.create(
                            {
                                formVersionId: newVersion.id,
                                approvalLineTemplateVersionId: oldLink.approvalLineTemplateVersionId,
                                isDefault: oldLink.isDefault,
                            },
                            { queryRunner },
                        );
                        await this.formVersionApprovalLineTemplateVersionService.save(newLinkEntity, { queryRunner });
                    }
                }

                // 6) Form의 current_version_id 업데이트
                form.currentVersionId = newVersion.id;
                await this.formService.save(form, { queryRunner });

                this.logger.log(`문서양식 수정 완료: v${newVersion.versionNo}`);
                return { form, newVersion };
            },
            externalQueryRunner,
        );
    }

    /**
     * 3. 결재선 템플릿 복제 (Detach & Clone)
     *
     * 전략:
     * - newTemplateName이 있으면 새 템플릿 생성
     * - 없으면 원본 템플릿에 새 버전 추가
     */
    async cloneApprovalLineTemplateVersion(dto: CloneApprovalLineTemplateDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재선 템플릿 복제 시작`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) 원본 버전 조회
                const baseVersion = await this.approvalLineTemplateVersionService.findOne({
                    where: { id: dto.baseTemplateVersionId },
                    queryRunner,
                });
                if (!baseVersion) {
                    throw new NotFoundException(
                        `원본 결재선 템플릿 버전을 찾을 수 없습니다: ${dto.baseTemplateVersionId}`,
                    );
                }

                // 2) 원본 템플릿 조회
                const baseTemplate = await this.approvalLineTemplateService.findOne({
                    where: { id: baseVersion.templateId },
                    queryRunner,
                });
                if (!baseTemplate) {
                    throw new NotFoundException(`원본 결재선 템플릿을 찾을 수 없습니다.`);
                }

                let targetTemplate = baseTemplate;
                let newVersionNo = 1;

                // 3) 새 템플릿 생성 또는 기존 템플릿 사용
                if (dto.newTemplateName) {
                    // 새 템플릿 생성 (분기)
                    const targetTemplateEntity = await this.approvalLineTemplateService.create(
                        {
                            name: dto.newTemplateName,
                            type: baseTemplate.type,
                            orgScope: baseTemplate.orgScope,
                            departmentId: baseTemplate.departmentId,
                            status: ApprovalLineTemplateStatus.ACTIVE,
                            createdBy: dto.createdBy,
                        },
                        { queryRunner },
                    );
                    targetTemplate = await this.approvalLineTemplateService.save(targetTemplateEntity, { queryRunner });
                    this.logger.debug(`새 결재선 템플릿 생성: ${targetTemplate.id}`);
                } else {
                    // 원본 템플릿에 새 버전 추가
                    newVersionNo = baseVersion.versionNo + 1;
                }

                // 4) 새 버전 생성
                const newVersionEntity = await this.approvalLineTemplateVersionService.create(
                    {
                        templateId: targetTemplate.id,
                        versionNo: newVersionNo,
                        isActive: true,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const newVersion = await this.approvalLineTemplateVersionService.save(newVersionEntity, {
                    queryRunner,
                });
                this.logger.debug(`새 결재선 템플릿 버전 생성: v${newVersionNo}`);

                // 5) 원본 단계들 복사
                const baseSteps = await this.approvalStepTemplateService.findAll({
                    where: { lineTemplateVersionId: baseVersion.id },
                    order: { stepOrder: 'ASC' },
                    queryRunner,
                });

                for (const baseStep of baseSteps) {
                    // stepEdits에서 수정사항 찾기
                    const edit = dto.stepEdits?.find((e) => e.stepOrder === baseStep.stepOrder);

                    const newStepEntity = await this.approvalStepTemplateService.create(
                        {
                            lineTemplateVersionId: newVersion.id,
                            stepOrder: baseStep.stepOrder,
                            stepType: edit?.stepType ?? baseStep.stepType,
                            assigneeRule: edit?.assigneeRule || baseStep.assigneeRule,
                            targetDepartmentId: edit?.targetDepartmentId || baseStep.targetDepartmentId,
                            targetPositionId: edit?.targetPositionId || baseStep.targetPositionId,
                            defaultApproverId: edit?.targetEmployeeId || baseStep.defaultApproverId,
                            required: edit?.isRequired !== undefined ? edit.isRequired : baseStep.required,
                        },
                        { queryRunner },
                    );
                    await this.approvalStepTemplateService.save(newStepEntity, { queryRunner });
                }

                // 6) 새 단계 추가 (stepEdits에만 있는 것들)
                if (dto.stepEdits) {
                    const existingOrders = baseSteps.map((s) => s.stepOrder);
                    const newSteps = dto.stepEdits.filter((e) => !existingOrders.includes(e.stepOrder));

                    for (const newStepDto of newSteps) {
                        const newStepEntity = await this.approvalStepTemplateService.create(
                            {
                                lineTemplateVersionId: newVersion.id,
                                stepOrder: newStepDto.stepOrder,
                                stepType: newStepDto.stepType,
                                assigneeRule: newStepDto.assigneeRule,
                                targetDepartmentId: newStepDto.targetDepartmentId,
                                targetPositionId: newStepDto.targetPositionId,
                                defaultApproverId: newStepDto.targetEmployeeId,
                                required: newStepDto.isRequired,
                            },
                            { queryRunner },
                        );
                        await this.approvalStepTemplateService.save(newStepEntity, { queryRunner });
                    }
                }

                // 7) 템플릿의 current_version_id 업데이트
                targetTemplate.currentVersionId = newVersion.id;
                await this.approvalLineTemplateService.save(targetTemplate, { queryRunner });

                this.logger.log(`결재선 템플릿 복제 완료: ${newVersion.id}`);
                return newVersion;
            },
            externalQueryRunner,
        );
    }

    /**
     * 4. 결재선 템플릿 새 버전 생성
     */
    async createApprovalLineTemplateVersion(
        dto: CreateApprovalLineTemplateVersionDto,
        externalQueryRunner?: QueryRunner,
    ) {
        this.logger.log(`결재선 템플릿 새 버전 생성 시작`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) 템플릿 조회
                const template = await this.approvalLineTemplateService.findOne({
                    where: { id: dto.templateId },
                    queryRunner,
                });
                if (!template) {
                    throw new NotFoundException(`결재선 템플릿을 찾을 수 없습니다: ${dto.templateId}`);
                }

                // 2) 현재 버전 조회
                const currentVersion = await this.approvalLineTemplateVersionService.findOne({
                    where: { id: template.currentVersionId },
                    queryRunner,
                });
                if (!currentVersion) {
                    throw new NotFoundException(`현재 템플릿 버전을 찾을 수 없습니다.`);
                }

                // 3) 새 버전 생성
                const newVersionEntity = await this.approvalLineTemplateVersionService.create(
                    {
                        templateId: template.id,
                        versionNo: currentVersion.versionNo + 1,
                        isActive: true,
                        changeReason: dto.versionNote,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const newVersion = await this.approvalLineTemplateVersionService.save(newVersionEntity, {
                    queryRunner,
                });

                // 4) 기존 버전 비활성화
                currentVersion.isActive = false;
                const updatedCurrentVersion = await this.approvalLineTemplateVersionService.save(currentVersion, {
                    queryRunner,
                });

                // 5) 새 단계들 생성
                for (const stepDto of dto.steps) {
                    const stepEntity = await this.approvalStepTemplateService.create(
                        {
                            lineTemplateVersionId: newVersion.id,
                            stepOrder: stepDto.stepOrder,
                            stepType: stepDto.stepType,
                            assigneeRule: stepDto.assigneeRule,
                            targetDepartmentId: stepDto.targetDepartmentId,
                            targetPositionId: stepDto.targetPositionId,
                            defaultApproverId: stepDto.targetEmployeeId,
                            required: stepDto.isRequired,
                        },
                        { queryRunner },
                    );
                    await this.approvalStepTemplateService.save(stepEntity, { queryRunner });
                }

                // 6) 템플릿의 current_version_id 업데이트
                template.currentVersionId = newVersion.id;
                await this.approvalLineTemplateService.save(template, { queryRunner });

                this.logger.log(`결재선 템플릿 새 버전 생성 완료: v${newVersion.versionNo}`);
                return newVersion;
            },
            externalQueryRunner,
        );
    }

    /**
     * 5. 새로운 결재선 템플릿 생성
     */
    async createApprovalLineTemplate(dto: CreateApprovalLineTemplateDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`새 결재선 템플릿 생성 시작: ${dto.name}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) 템플릿 생성
                const templateEntity = await this.approvalLineTemplateService.create(
                    {
                        name: dto.name,
                        description: dto.description,
                        type: dto.type,
                        orgScope: dto.orgScope,
                        departmentId: dto.departmentId,
                        status: ApprovalLineTemplateStatus.ACTIVE,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });
                this.logger.debug(`결재선 템플릿 생성 완료: ${template.id}`);

                // 2) 첫 버전(v1) 생성
                const versionEntity = await this.approvalLineTemplateVersionService.create(
                    {
                        templateId: template.id,
                        versionNo: 1,
                        isActive: true,
                        createdBy: dto.createdBy,
                    },
                    { queryRunner },
                );
                const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });
                this.logger.debug(`결재선 템플릿 버전 생성 완료: v1`);

                // 3) 단계들 생성
                for (const stepDto of dto.steps) {
                    const stepEntity = await this.approvalStepTemplateService.create(
                        {
                            lineTemplateVersionId: version.id,
                            stepOrder: stepDto.stepOrder,
                            stepType: stepDto.stepType,
                            assigneeRule: stepDto.assigneeRule,
                            targetDepartmentId: stepDto.targetDepartmentId,
                            targetPositionId: stepDto.targetPositionId,
                            defaultApproverId: stepDto.targetEmployeeId,
                            required: stepDto.isRequired,
                        },
                        { queryRunner },
                    );
                    await this.approvalStepTemplateService.save(stepEntity, { queryRunner });
                }

                // 4) 템플릿의 current_version_id 업데이트
                template.currentVersionId = version.id;
                await this.approvalLineTemplateService.save(template, { queryRunner });

                this.logger.log(`새 결재선 템플릿 생성 완료: ${template.id}`);
                return { template, version };
            },
            externalQueryRunner,
        );
    }

    /**
     * 자동 계층적 결재선 생성
     * 기안자 → 부서장 → 상위 부서장 → ... (최상위까지)
     */
    private async createHierarchicalApprovalLine(
        drafterId: string,
        drafterDepartmentId: string,
        queryRunner: any,
    ): Promise<ResolvedApproverDto[]> {
        this.logger.log(`자동 계층적 결재선 생성 시작 (기안자: ${drafterId}, 부서: ${drafterDepartmentId})`);

        const approvers: ResolvedApproverDto[] = [];
        let stepOrder = 1;

        // 1. 기안자를 첫 번째 결재자로 추가
        const drafterEdp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: drafterId, departmentId: drafterDepartmentId },
            queryRunner,
        });

        approvers.push({
            employeeId: drafterId,
            departmentId: drafterDepartmentId,
            positionId: drafterEdp?.positionId,
            stepOrder,
            stepType: ApprovalStepType.APPROVAL,
            assigneeRule: AssigneeRule.FIXED,
            isRequired: true,
        });

        this.logger.debug(`${stepOrder}단계 추가: 기안자 (${drafterId})`);
        stepOrder++;

        // 2. 부서 계층별 부서장 추가
        let currentDepartmentId = drafterDepartmentId;

        // 최대 10단계까지만 (무한 루프 방지)
        let maxSteps = 10;

        while (currentDepartmentId && maxSteps > 0) {
            // 현재 부서의 부서장 조회
            const headEdp = await this.employeeDepartmentPositionService.findOne({
                where: { departmentId: currentDepartmentId, isManager: true },
                queryRunner,
            });

            let departmentHead = headEdp;

            // isManager가 없으면 hasManagementAuthority로 조회
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

            // 부서장이 있고, 기안자가 아닌 경우 추가
            if (departmentHead && departmentHead.employeeId !== drafterId) {
                approvers.push({
                    employeeId: departmentHead.employeeId,
                    departmentId: departmentHead.departmentId,
                    positionId: departmentHead.positionId,
                    stepOrder,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.DRAFTER_SUPERIOR,
                    isRequired: true,
                });

                this.logger.debug(
                    `${stepOrder}단계 추가: 부서 ${currentDepartmentId}의 부서장 (${departmentHead.employeeId})`,
                );
                stepOrder++;
            }

            // 상위 부서로 이동
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
            throw new BadRequestException('결재선을 생성할 수 없습니다. 부서장이 없거나 기안자가 유일한 부서장입니다.');
        }

        this.logger.log(`자동 계층적 결재선 생성 완료: ${approvers.length}단계`);
        return approvers;
    }

    /**
     * 6. 기안 시 스냅샷 생성
     *
     * 프로세스:
     * 1) FormVersion의 결재선 템플릿 버전 조회
     * 2) 템플릿이 없으면 자동 계층적 결재선 생성
     * 3) 각 StepTemplate의 assignee_rule을 기안 컨텍스트로 해석
     * 4) 해석된 결과로 ApprovalLineSnapshot/ApprovalStepSnapshot 생성
     */
    async createApprovalSnapshot(dto: CreateSnapshotDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재 스냅샷 생성 시작: Document ${dto.documentId}`);
        this.logger.log(`customApprovalSteps: ${JSON.stringify(dto.customApprovalSteps)}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 기존 스냅샷이 있으면 먼저 삭제 (유니크 제약조건 방지)
                const existingSnapshot = await this.approvalLineSnapshotService.findOne({
                    where: { documentId: dto.documentId },
                    queryRunner,
                });

                if (existingSnapshot) {
                    this.logger.log(`기존 스냅샷 발견, 삭제 중: ${existingSnapshot.id}`);
                    // ApprovalStepSnapshot들 먼저 삭제
                    await this.approvalStepSnapshotService.delete({ snapshotId: existingSnapshot.id } as any, {
                        queryRunner,
                    });
                    // ApprovalLineSnapshot 삭제
                    await this.approvalLineSnapshotService.delete(existingSnapshot.id, { queryRunner });
                }

                // 무조건 body로 받은 스텝 정보로 스냅샷 생성
                let resolvedApprovers: ResolvedApproverDto[] = [];

                if (dto.customApprovalSteps && dto.customApprovalSteps.length > 0) {
                    // 사용자 정의 결재선 생성
                    this.logger.log(`사용자 정의 결재선 생성 - 단계 수: ${dto.customApprovalSteps.length}`);

                    for (const customStep of dto.customApprovalSteps) {
                        if (customStep.assigneeRule === 'DEPARTMENT_REFERENCE' && (customStep as any).departmentId) {
                            // 부서 전체 참조: 해당 부서의 모든 직원을 개별 스냅샷으로 저장
                            this.logger.log(`부서 전체 참조 처리: 부서 ${(customStep as any).departmentId}`);

                            // 1. 부서원들을 모두 조회 (EmployeeDepartmentPosition을 통해)
                            const departmentEdps = await this.employeeDepartmentPositionService.findAll({
                                where: { departmentId: (customStep as any).departmentId },
                                queryRunner,
                            });

                            const departmentEmployees = [];
                            for (const edp of departmentEdps) {
                                const employee = await this.employeeService.findOne({
                                    where: { id: edp.employeeId },
                                    queryRunner,
                                });
                                if (employee) {
                                    departmentEmployees.push(employee);
                                }
                            }

                            // 2. 부서원들을 개별적으로 추가
                            for (const employee of departmentEmployees) {
                                resolvedApprovers.push({
                                    employeeId: employee.id,
                                    employeeName: employee.name,
                                    departmentId: (customStep as any).departmentId,
                                    positionId: undefined, // 부서 선택의 경우 positionId 없음
                                    stepOrder: customStep.stepOrder,
                                    stepType: customStep.stepType,
                                    assigneeRule: customStep.assigneeRule,
                                    isRequired: customStep.isRequired,
                                });
                            }

                            this.logger.log(`부서 전체 참조 완료: ${departmentEmployees.length}명의 직원 추가`);
                        } else if (customStep.employeeId) {
                            // 개별 직원 처리 (기존 로직)
                            // 직원 정보 조회
                            const employee = await this.employeeService.findOne({
                                where: { id: customStep.employeeId },
                                queryRunner,
                            });

                            if (!employee) {
                                throw new NotFoundException(`직원을 찾을 수 없습니다: ${customStep.employeeId}`);
                            }

                            // 직원의 부서/직급 정보 조회
                            const edp = await this.employeeDepartmentPositionService.findOne({
                                where: { employeeId: customStep.employeeId },
                                queryRunner,
                            });

                            resolvedApprovers.push({
                                employeeId: customStep.employeeId,
                                employeeName: employee.name,
                                departmentId: edp?.departmentId,
                                positionId: edp?.positionId,
                                stepOrder: customStep.stepOrder,
                                stepType: customStep.stepType,
                                assigneeRule: customStep.assigneeRule,
                                isRequired: customStep.isRequired,
                            });
                        } else {
                            // employeeId가 없는 경우 (잘못된 데이터)
                            this.logger.warn(`employeeId가 없는 결재 단계: ${JSON.stringify(customStep)}`);

                            // assigneeRule에 따라 다른 에러 메시지 제공
                            if (customStep.assigneeRule === 'FIXED') {
                                throw new BadRequestException(
                                    `고정 담당자 선택 시 직원 ID가 필요합니다: ${customStep.stepOrder}번 단계`,
                                );
                            } else if (customStep.assigneeRule === 'DEPARTMENT_REFERENCE') {
                                throw new BadRequestException(
                                    `부서 선택 시 부서 ID가 필요합니다: ${customStep.stepOrder}번 단계`,
                                );
                            } else {
                                throw new BadRequestException(
                                    `결재 단계에 직원 ID가 필요합니다: ${customStep.stepOrder}번 단계`,
                                );
                            }
                        }
                    }
                } else {
                    // customApprovalSteps가 없으면 자동 계층적 결재선 생성
                    this.logger.log(`자동 계층적 결재선 생성`);

                    if (!dto.draftContext.drafterDepartmentId) {
                        throw new BadRequestException(
                            '결재선 정보가 없고, 기안자의 부서 정보도 없습니다. drafterDepartmentId를 제공해주세요.',
                        );
                    }

                    resolvedApprovers = await this.createHierarchicalApprovalLine(
                        dto.draftContext.drafterId,
                        dto.draftContext.drafterDepartmentId,
                        queryRunner,
                    );
                }

                if (resolvedApprovers.length === 0) {
                    throw new BadRequestException('결재선을 구성할 수 없습니다. 결재자가 없습니다.');
                }

                // 5) ApprovalLineSnapshot 생성
                const snapshotName =
                    dto.customApprovalSteps && dto.customApprovalSteps.length > 0
                        ? '사용자 정의 결재선'
                        : '자동 생성 결재선';
                const snapshotDescription =
                    dto.customApprovalSteps && dto.customApprovalSteps.length > 0
                        ? '제출 시 수정된 결재선'
                        : '부서 계층에 따른 자동 생성 결재선';

                const snapshotEntity = await this.approvalLineSnapshotService.create(
                    {
                        documentId: dto.documentId,
                        sourceTemplateVersionId: null, // 템플릿과의 연결 제거
                        snapshotName,
                        snapshotDescription,
                        frozenAt: new Date(),
                    },
                    { queryRunner },
                );
                const snapshot = await this.approvalLineSnapshotService.save(snapshotEntity, { queryRunner });

                // 6) ApprovalStepSnapshot들 생성
                for (const resolved of resolvedApprovers) {
                    const stepSnapshotEntity = await this.approvalStepSnapshotService.create(
                        {
                            snapshotId: snapshot.id,
                            stepOrder: resolved.stepOrder,
                            stepType: resolved.stepType as ApprovalStepType,
                            assigneeRule: resolved.assigneeRule,
                            approverId: resolved.employeeId, // 실제 직원 ID 사용
                            approverDepartmentId: resolved.departmentId,
                            approverPositionId: resolved.positionId,
                            required: resolved.isRequired,
                            status: ApprovalStatus.PENDING,
                        },
                        { queryRunner },
                    );
                    await this.approvalStepSnapshotService.save(stepSnapshotEntity, { queryRunner });
                }

                this.logger.log(`결재 스냅샷 생성 완료: ${snapshot.id} (${resolvedApprovers.length}개 단계)`);
                return snapshot;
            },
            externalQueryRunner,
        );
    }

    /**
     * 6. Assignee Rule 해석 (핵심 로직)
     *
     * Enum 기반 규칙을 실제 직원 목록으로 변환
     */
    private async resolveAssigneeRule(
        rule: AssigneeRule,
        context: DraftContextDto,
        stepTemplate: any,
        queryRunner: any,
    ): Promise<Array<{ employeeId: string; departmentId?: string; positionId?: string }>> {
        if (!rule) {
            this.logger.warn('assignee_rule이 없거나 유효하지 않습니다.');
            return [];
        }

        // enum을 직접 사용 (JSON 객체가 아님)
        const ruleType = rule as AssigneeRule;

        switch (ruleType) {
            case AssigneeRule.FIXED:
                return this.resolveFixedUser(stepTemplate, queryRunner);

            case AssigneeRule.DRAFTER:
                return this.resolveDrafter(context, queryRunner);

            case AssigneeRule.DRAFTER_SUPERIOR:
                return this.resolveDirectManager(context, queryRunner);

            case AssigneeRule.DEPARTMENT_REFERENCE:
                return this.resolveDepartmentReference(stepTemplate, context, queryRunner);

            default:
                this.logger.warn(`지원하지 않는 assignee_rule 타입: ${ruleType}`);
                return [];
        }
    }

    // Rule 해석 헬퍼 메서드들

    private async resolveDrafter(context: DraftContextDto, queryRunner: any) {
        // 기안자를 결재자로 반환
        return [
            {
                employeeId: context.drafterId,
                departmentId: context.drafterDepartmentId,
            },
        ];
    }

    private async resolveFixedUser(stepTemplate: any, queryRunner: any) {
        const rule: any = { userId: stepTemplate.defaultApproverId };
        const employee = await this.employeeService.findOne({ where: { id: rule.userId }, queryRunner });
        if (!employee) {
            throw new NotFoundException(`고정 사용자를 찾을 수 없습니다: ${rule.userId}`);
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

    private async resolveDirectManager(context: DraftContextDto, queryRunner: any) {
        // 기안자의 직속 상관 찾기
        if (!context.drafterDepartmentId) {
            throw new BadRequestException('기안자의 부서 정보가 없습니다.');
        }

        // 1순위: isManager=true인 직원 찾기
        let manager = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: context.drafterDepartmentId, isManager: true },
            queryRunner,
        });

        // 2순위: hasManagementAuthority=true인 직책을 가진 직원 찾기
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
            throw new NotFoundException(
                '직속 상관을 찾을 수 없습니다. (isManager 또는 hasManagementAuthority를 가진 직원이 없음)',
            );
        }

        return [
            {
                employeeId: manager.employeeId,
                departmentId: manager.departmentId,
                positionId: manager.positionId,
            },
        ];
    }

    private async resolveManagerChain(context: DraftContextDto, depth: number, queryRunner: any) {
        // depth 단계 위의 상관 찾기 (재귀적으로 부서 상위로 올라감)
        const managers: Array<{ employeeId: string; departmentId?: string; positionId?: string }> = [];
        let currentDepartmentId = context.drafterDepartmentId;

        for (let i = 0; i < depth; i++) {
            if (!currentDepartmentId) break;

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

            // 상위 부서로 이동
            const dept = await this.departmentService.findOne({ where: { id: currentDepartmentId }, queryRunner });
            currentDepartmentId = dept?.parentDepartmentId;
        }

        return managers;
    }

    private async resolveDepartmentReference(stepTemplate: any, context: DraftContextDto, queryRunner: any) {
        // 부서 전체 참조: 해당 부서의 모든 직원을 반환
        const targetDepartmentId = stepTemplate.targetDepartmentId;
        if (!targetDepartmentId) {
            throw new BadRequestException('부서 정보가 없습니다.');
        }

        // 해당 부서의 모든 직원 조회 (EmployeeDepartmentPosition을 통해)
        const departmentEdps = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId: targetDepartmentId },
            queryRunner,
        });

        const departmentEmployees = [];
        for (const edp of departmentEdps) {
            const employee = await this.employeeService.findOne({
                where: { id: edp.employeeId },
                queryRunner,
            });
            if (employee) {
                departmentEmployees.push(employee);
            }
        }

        const result = [];
        for (const employee of departmentEmployees) {
            // 직원의 부서/직급 정보 조회
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: employee.id },
                queryRunner,
            });

            result.push({
                employeeId: employee.id,
                departmentId: edp?.departmentId,
                positionId: edp?.positionId,
            });
        }

        return result;
    }

    private async resolveAmountBased(rule: any, context: DraftContextDto, queryRunner: any) {
        // 금액 기반 결재자 결정
        const amount = context.documentAmount || 0;
        const threshold = rule.thresholds.find((t: any) => amount <= t.max);

        if (!threshold) {
            throw new BadRequestException('금액에 해당하는 결재자를 찾을 수 없습니다.');
        }

        if (threshold.userId) {
            return this.resolveFixedUser({ userId: threshold.userId }, queryRunner);
        }

        return [];
    }

    // ===== 조회 메서드 =====

    /**
     * 결재선 템플릿 목록 조회
     */
    async getApprovalLineTemplates(type?: string) {
        this.logger.debug(`결재선 템플릿 목록 조회: type=${type}`);
        const templates = await this.approvalLineTemplateService.findAll();

        if (type) {
            return templates.filter((t) => t.type === type);
        }

        return templates;
    }

    /**
     * 결재선 템플릿 버전 상세 조회
     */
    async getApprovalLineTemplateVersion(templateId: string, versionId: string) {
        this.logger.debug(`결재선 템플릿 버전 조회: templateId=${templateId}, versionId=${versionId}`);
        return await this.approvalLineTemplateVersionService.findByVersionId(versionId);
    }

    /**
     * 문서양식 목록 조회
     */
    async getForms() {
        this.logger.debug('문서양식 목록 조회');
        return await this.formService.findAll();
    }

    /**
     * 문서양식 버전 상세 조회
     */
    async getFormVersion(formId: string, versionId: string) {
        this.logger.debug(`문서양식 버전 조회: formId=${formId}, versionId=${versionId}`);
        const formVersion = await this.formVersionService.findByFormVersionId(versionId);

        // 연결된 결재선 템플릿 정보 조회
        const mappings = await this.formVersionApprovalLineTemplateVersionService.findAll({
            where: { formVersionId: versionId },
        });

        let approvalLineInfo = null;
        if (mappings && mappings.length > 0) {
            // 기본 결재선 또는 첫 번째 결재선 선택
            const defaultMapping = mappings.find((m) => m.isDefault) || mappings[0];
            const templateVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: defaultMapping.approvalLineTemplateVersionId },
            });

            if (templateVersion) {
                const template = await this.approvalLineTemplateService.findOne({
                    where: { id: templateVersion.templateId },
                });

                // Step 정보와 직원/부서 정보 조회
                const steps = await this.getApprovalStepTemplatesWithDetails(templateVersion.id);

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

    /**
     * ID로 결재선 템플릿 조회
     */
    async getApprovalLineTemplateById(templateId: string) {
        this.logger.debug(`결재선 템플릿 조회: templateId=${templateId}`);
        return await this.approvalLineTemplateService.findByTemplateId(templateId);
    }

    /**
     * ID로 문서양식 조회
     */
    async getFormById(formId: string) {
        this.logger.debug(`문서양식 조회: formId=${formId}`);
        return await this.formService.findByFormId(formId);
    }

    /**
     * 결재 단계 템플릿 조회 (직원/부서 정보 포함)
     */
    async getApprovalStepTemplatesWithDetails(versionId: string) {
        this.logger.debug(`결재 단계 템플릿 조회: versionId=${versionId}`);
        const steps = await this.approvalStepTemplateService.findAll({
            where: { lineTemplateVersionId: versionId },
            order: { stepOrder: 'ASC' },
        });

        // 각 step에 직원/부서 정보 추가
        const stepsWithDetails = await Promise.all(
            steps.map(async (step) => {
                const stepDetail: any = { ...step };

                // 직원 정보 추가
                if (step.defaultApproverId) {
                    const employee = await this.employeeService.findByEmployeeId(step.defaultApproverId);
                    if (employee) {
                        stepDetail.defaultApprover = {
                            id: employee.id,
                            employeeNumber: employee.employeeNumber,
                            name: employee.name,
                            email: employee.email,
                            phoneNumber: employee.phoneNumber,
                        };
                    }
                }

                // 부서 정보 추가
                if (step.targetDepartmentId) {
                    const department = await this.departmentService.findOne({
                        where: { id: step.targetDepartmentId },
                    });
                    if (department) {
                        stepDetail.targetDepartment = {
                            id: department.id,
                            departmentCode: department.departmentCode,
                            departmentName: department.departmentName,
                        };
                    }
                }

                // 직책 정보 추가
                if (step.targetPositionId) {
                    const position = await this.positionService.findOne({
                        where: { id: step.targetPositionId },
                    });
                    if (position) {
                        stepDetail.targetPosition = {
                            id: position.id,
                            positionCode: position.positionCode,
                            positionTitle: position.positionTitle,
                            level: position.level,
                            hasManagementAuthority: position.hasManagementAuthority,
                        };
                    }
                }

                return stepDetail;
            }),
        );

        return stepsWithDetails;
    }
}
