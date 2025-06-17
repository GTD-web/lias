import { Repository } from 'typeorm';
import { FormApprovalLine } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFormApprovalLineRepository extends BaseRepository<FormApprovalLine> {
    constructor(repository: Repository<FormApprovalLine>);
}
