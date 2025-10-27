import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { DomainFormService } from '../../../domain/form/form.service';
import { DomainFormVersionService } from '../../../domain/form/form-version.service';
import { DomainApprovalLineTemplateService } from '../../../domain/approval-line-template/approval-line-template.service';
import { DomainApprovalLineTemplateVersionService } from '../../../domain/approval-line-template/approval-line-template-version.service';
import { DomainApprovalStepTemplateService } from '../../../domain/approval-step-template/approval-step-template.service';
import { DomainFormVersionApprovalLineTemplateVersionService } from '../../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { DomainPositionService } from '../../../domain/position/position.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
import { PreviewApprovalLineRequestDto } from '../dtos/preview-approval-line-request.dto';
import { PreviewApprovalLineResponseDto, ApprovalStepPreviewDto } from '../dtos/preview-approval-line-response.dto';
import { AssigneeRule } from '../../../../common/enums/approval.enum';

/**
 * 결재선 미리보기 유스케이스
 *
 * 문서 작성 시 실제로 어떤 결재자들이 할당될지 미리 확인
 */
@Injectable()
export class PreviewApprovalLineUsecase {
    private readonly logger = new Logger(PreviewApprovalLineUsecase.name);

    constructor(
        private readonly formService: DomainFormService,
        private readonly formVersionService: DomainFormVersionService,
        private readonly approvalLineTemplateService: DomainApprovalLineTemplateService,
        private readonly approvalLineTemplateVersionService: DomainApprovalLineTemplateVersionService,
        private readonly approvalStepTemplateService: DomainApprovalStepTemplateService,
        private readonly formVersionApprovalLineTemplateVersionService: DomainFormVersionApprovalLineTemplateVersionService,
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly positionService: DomainPositionService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    async execute(
        drafterId: string,
        formId: string,
        dto: PreviewApprovalLineRequestDto,
    ): Promise<PreviewApprovalLineResponseDto> {
        this.logger.log(
            `결재선 미리보기 요청: 기안자=${drafterId}, formId=${formId}, formVersionId=${dto.formVersionId}`,
        );

        // 0) Form 존재 여부 검증
        const form = await this.formService.findOne({
            where: { id: formId },
        });
        if (!form) {
            throw new NotFoundException(`문서양식을 찾을 수 없습니다: ${formId}`);
        }

        // 1) 기안 부서 자동 조회 (미입력시)
        let drafterDepartmentId = dto.drafterDepartmentId;
        if (!drafterDepartmentId) {
            this.logger.debug(`기안 부서 미입력 → 직원의 주 소속 부서 자동 조회: ${drafterId}`);
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: drafterId },
            });

            if (!edp) {
                throw new BadRequestException('기안자의 부서 정보를 찾을 수 없습니다.');
            }
            drafterDepartmentId = edp.departmentId;
        }

        // 2) FormVersion 조회
        const formVersion = await this.formVersionService.findOne({
            where: { id: dto.formVersionId },
        });
        if (!formVersion) {
            throw new NotFoundException(`FormVersion을 찾을 수 없습니다: ${dto.formVersionId}`);
        }

        // 3) 연결된 결재선 템플릿 버전 조회
        const link = await this.formVersionApprovalLineTemplateVersionService.findOne({
            where: { formVersionId: formVersion.id, isDefault: true },
        });

        let steps: ApprovalStepPreviewDto[] = [];
        let templateName = '자동 생성 결재선';
        let templateDescription = '부서 계층에 따른 자동 생성 결재선';

        if (!link) {
            // 결재선 템플릿이 없으면 자동으로 계층적 결재선 미리보기 생성
            this.logger.debug(`결재선 템플릿이 없어서 자동 계층 결재선 미리보기 생성`);
            steps = await this.generateHierarchicalPreview(drafterId, drafterDepartmentId);
        } else {
            const lineTemplateVersion = await this.approvalLineTemplateVersionService.findOne({
                where: { id: link.approvalLineTemplateVersionId },
            });
            if (!lineTemplateVersion) {
                throw new NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다.`);
            }

            // 4) 템플릿 정보 조회
            const template = await this.approvalLineTemplateService.findOne({
                where: { id: lineTemplateVersion.templateId },
            });

            templateName = template?.name || '결재선';
            templateDescription = template?.description;

            // 5) 단계 템플릿들 조회
            const stepTemplates = await this.approvalStepTemplateService.findAll({
                where: { lineTemplateVersionId: lineTemplateVersion.id },
                order: { stepOrder: 'ASC' },
            });

            // 6) 각 단계의 assignee_rule 해석
            for (const stepTemplate of stepTemplates) {
                const approvers = await this.resolveAssigneeRule(
                    stepTemplate.assigneeRule as AssigneeRule,
                    {
                        drafterId,
                        drafterDepartmentId,
                        documentAmount: dto.documentAmount,
                        documentType: dto.documentType,
                    },
                    stepTemplate,
                );

                // 각 결재자에 대한 상세 정보 조회
                for (const approver of approvers) {
                    const employee = await this.employeeService.findOne({
                        where: { id: approver.employeeId },
                    });

                    let departmentName: string | undefined;
                    let positionTitle: string | undefined;

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

    /**
     * 자동 계층 결재선 미리보기 생성
     */
    private async generateHierarchicalPreview(
        drafterId: string,
        drafterDepartmentId: string,
    ): Promise<ApprovalStepPreviewDto[]> {
        this.logger.log(`자동 계층 결재선 미리보기 생성: 기안자=${drafterId}, 부서=${drafterDepartmentId}`);

        const steps: ApprovalStepPreviewDto[] = [];
        let stepOrder = 1;

        // 1. 기안자를 첫 번째 결재자로 추가
        const drafter = await this.employeeService.findOne({
            where: { id: drafterId },
        });

        const drafterEdp = await this.employeeDepartmentPositionService.findOne({
            where: { employeeId: drafterId, departmentId: drafterDepartmentId },
        });

        const drafterDepartment = await this.departmentService.findOne({
            where: { id: drafterDepartmentId },
        });

        let drafterPositionTitle: string | undefined;
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
            assigneeRule: AssigneeRule.FIXED,
        });

        this.logger.debug(`단계 ${stepOrder}: 기안자 ${drafter?.name} 추가`);
        stepOrder++;

        // 2. 부서 계층별 부서장 추가
        let currentDepartmentId = drafterDepartmentId;
        let maxSteps = 10; // 최대 10단계

        while (currentDepartmentId && maxSteps > 0) {
            // 1순위: isManager=true인 직원 찾기
            let departmentHeadEdp = await this.employeeDepartmentPositionService.findOne({
                where: { departmentId: currentDepartmentId, isManager: true },
            });

            // 2순위: hasManagementAuthority=true인 직책을 가진 직원 찾기
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

            // 부서장이 있고, 기안자가 아닌 경우 단계에 추가
            if (departmentHeadEdp && departmentHeadEdp.employeeId !== drafterId) {
                const employee = await this.employeeService.findOne({
                    where: { id: departmentHeadEdp.employeeId },
                });

                const department = await this.departmentService.findOne({
                    where: { id: departmentHeadEdp.departmentId },
                });

                let positionTitle: string | undefined;
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
                    assigneeRule: AssigneeRule.DRAFTER_SUPERIOR,
                });

                this.logger.debug(`단계 ${stepOrder}: 부서 ${currentDepartmentId}의 부서장 ${employee?.name} 추가`);
                stepOrder++;
            }

            // 상위 부서로 이동
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
            throw new BadRequestException('결재선을 생성할 수 없습니다. 부서장이 없거나 기안자가 유일한 부서장입니다.');
        }

        this.logger.log(`자동 계층 결재선 미리보기 생성 완료: ${steps.length}단계`);
        return steps;
    }

    // AssigneeRule 해석 로직 (approval-flow.context.ts와 동일)
    private async resolveAssigneeRule(
        rule: AssigneeRule,
        context: {
            drafterId: string;
            drafterDepartmentId: string;
            documentAmount?: number;
            documentType?: string;
        },
        stepTemplate: any,
    ): Promise<Array<{ employeeId: string; departmentId?: string; positionId?: string }>> {
        switch (rule) {
            case AssigneeRule.FIXED:
                return this.resolveFixedUser(stepTemplate);

            case AssigneeRule.DRAFTER:
                return this.resolveDrafter(context);

            case AssigneeRule.DRAFTER_SUPERIOR:
                return this.resolveDirectManager(context);

            case AssigneeRule.DEPARTMENT_REFERENCE:
                return this.resolveDepartmentReference(stepTemplate, context);

            default:
                this.logger.warn(`지원하지 않는 assignee_rule 타입: ${rule}`);
                return [];
        }
    }

    private async resolveDrafter(context: any) {
        return [
            {
                employeeId: context.drafterId,
                departmentId: context.drafterDepartmentId,
            },
        ];
    }

    private async resolveFixedUser(stepTemplate: any) {
        const employee = await this.employeeService.findOne({
            where: { id: stepTemplate.defaultApproverId },
        });
        if (!employee) {
            throw new NotFoundException(`고정 사용자를 찾을 수 없습니다: ${stepTemplate.defaultApproverId}`);
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

    private async resolveDirectManager(context: any) {
        // 1순위: isManager=true인 직원 찾기
        let manager = await this.employeeDepartmentPositionService.findOne({
            where: { departmentId: context.drafterDepartmentId, isManager: true },
        });

        // 2순위: hasManagementAuthority=true인 직책을 가진 직원 찾기
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

    private async resolveDepartmentReference(stepTemplate: any, context: any) {
        const targetDepartmentId = stepTemplate.targetDepartmentId;
        if (!targetDepartmentId) {
            throw new BadRequestException('부서 정보가 없습니다.');
        }

        // 해당 부서의 모든 직원 조회
        const departmentEdps = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId: targetDepartmentId },
        });

        const result = [];
        for (const edp of departmentEdps) {
            const employee = await this.employeeService.findOne({
                where: { id: edp.employeeId },
            });
            if (employee) {
                result.push({
                    employeeId: employee.id,
                    departmentId: edp.departmentId,
                    positionId: edp.positionId,
                });
            }
        }

        return result;
    }
}
