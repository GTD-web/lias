import { QueryRunner } from 'typeorm';
import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepTemplate } from './approval-step-template.entity';
import { ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';
export declare class DomainApprovalStepTemplateService extends BaseService<ApprovalStepTemplate> {
    private readonly approvalStepTemplateRepository;
    constructor(approvalStepTemplateRepository: DomainApprovalStepTemplateRepository);
    createApprovalStepTemplate(params: {
        documentTemplateId: string;
        stepOrder: number;
        stepType: ApprovalStepType;
        assigneeRule: AssigneeRule;
        targetEmployeeId?: string;
        targetDepartmentId?: string;
        targetPositionId?: string;
    }, queryRunner?: QueryRunner): Promise<ApprovalStepTemplate>;
    updateApprovalStepTemplate(approvalStepTemplate: ApprovalStepTemplate, params: {
        stepOrder?: number;
        stepType?: ApprovalStepType;
        assigneeRule?: AssigneeRule;
        targetEmployeeId?: string | null;
        targetDepartmentId?: string | null;
        targetPositionId?: string | null;
    }, queryRunner?: QueryRunner): Promise<ApprovalStepTemplate>;
}
