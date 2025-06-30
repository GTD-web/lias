import { Repository } from 'typeorm';
import { ApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainApprovalStepRepository extends BaseRepository<ApprovalStep> {
    constructor(repository: Repository<ApprovalStep>);
}
