import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { CreateApprovalStepDto } from '../../dtos';
import { ApprovalStep } from 'src/database/entities';
import { QueryRunner } from 'typeorm';
export declare class CreateApproveStepUseCase {
    private readonly domainApprovalStepService;
    constructor(domainApprovalStepService: DomainApprovalStepService);
    execute(documentId: string, stepData: CreateApprovalStepDto, queryRunner: QueryRunner): Promise<ApprovalStep>;
}
