import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepTemplate } from './approval-step-template.entity';
import { ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalStepTemplateService extends BaseService<ApprovalStepTemplate> {
    constructor(private readonly approvalStepTemplateRepository: DomainApprovalStepTemplateRepository) {
        super(approvalStepTemplateRepository);
    }

    /**
     * 결재단계 템플릿을 생성한다
     */
    async createApprovalStepTemplate(
        params: {
            documentTemplateId: string;
            stepOrder: number;
            stepType: ApprovalStepType;
            assigneeRule: AssigneeRule;
            targetEmployeeId?: string;
            targetDepartmentId?: string;
            targetPositionId?: string;
        },
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepTemplate> {
        const approvalStepTemplate = new ApprovalStepTemplate();

        approvalStepTemplate.문서템플릿을설정한다(params.documentTemplateId);
        approvalStepTemplate.결재단계순서를설정한다(params.stepOrder);
        approvalStepTemplate.결재단계타입을설정한다(params.stepType);
        approvalStepTemplate.결재자할당규칙을설정한다(params.assigneeRule);

        if (params.targetEmployeeId) {
            approvalStepTemplate.대상직원을설정한다(params.targetEmployeeId);
        }
        if (params.targetDepartmentId) {
            approvalStepTemplate.대상부서를설정한다(params.targetDepartmentId);
        }
        if (params.targetPositionId) {
            approvalStepTemplate.대상직책을설정한다(params.targetPositionId);
        }

        return await this.approvalStepTemplateRepository.save(approvalStepTemplate, { queryRunner });
    }

    /**
     * 결재단계 템플릿을 수정한다
     */
    async updateApprovalStepTemplate(
        approvalStepTemplate: ApprovalStepTemplate,
        params: {
            stepOrder?: number;
            stepType?: ApprovalStepType;
            assigneeRule?: AssigneeRule;
            targetEmployeeId?: string | null;
            targetDepartmentId?: string | null;
            targetPositionId?: string | null;
        },
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepTemplate> {
        if (params.stepOrder !== undefined) {
            approvalStepTemplate.결재단계순서를설정한다(params.stepOrder);
        }
        if (params.stepType) {
            approvalStepTemplate.결재단계타입을설정한다(params.stepType);
        }
        if (params.assigneeRule) {
            approvalStepTemplate.결재자할당규칙을설정한다(params.assigneeRule);
        }
        if (params.targetEmployeeId !== undefined) {
            approvalStepTemplate.대상직원을설정한다(params.targetEmployeeId || undefined);
        }
        if (params.targetDepartmentId !== undefined) {
            approvalStepTemplate.대상부서를설정한다(params.targetDepartmentId || undefined);
        }
        if (params.targetPositionId !== undefined) {
            approvalStepTemplate.대상직책을설정한다(params.targetPositionId || undefined);
        }

        return await this.approvalStepTemplateRepository.save(approvalStepTemplate, { queryRunner });
    }
}
