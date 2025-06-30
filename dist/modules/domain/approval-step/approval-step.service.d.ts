import { DomainApprovalStepRepository } from './approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStep } from '../../../database/entities';
import { QueryRunner } from 'typeorm';
export declare class DomainApprovalStepService extends BaseService<ApprovalStep> {
    private readonly approvalStepRepository;
    constructor(approvalStepRepository: DomainApprovalStepRepository);
    approve(id: string, queryRunner?: QueryRunner): Promise<ApprovalStep>;
    reject(id: string, queryRunner?: QueryRunner): Promise<ApprovalStep>;
    setCurrent(id: string, queryRunner?: QueryRunner): Promise<ApprovalStep>;
}
