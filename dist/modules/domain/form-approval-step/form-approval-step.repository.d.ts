import { Repository } from 'typeorm';
import { FormApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFormApprovalStepRepository extends BaseRepository<FormApprovalStep> {
    constructor(repository: Repository<FormApprovalStep>);
}
