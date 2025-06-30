import { Repository } from 'typeorm';
import { FormApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IRepositoryOptions } from 'src/common/interfaces/repository.interface';
export declare class DomainFormApprovalStepRepository extends BaseRepository<FormApprovalStep> {
    constructor(repository: Repository<FormApprovalStep>);
    deleteByFormApprovalLineId(formApprovalLineId: string, repositoryOptions?: IRepositoryOptions<FormApprovalStep>): Promise<void>;
}
