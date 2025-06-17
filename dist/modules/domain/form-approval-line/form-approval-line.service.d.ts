import { DomainFormApprovalLineRepository } from './form-approval-line.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalLine } from '../../../database/entities';
export declare class DomainFormApprovalLineService extends BaseService<FormApprovalLine> {
    private readonly formApprovalLineRepository;
    constructor(formApprovalLineRepository: DomainFormApprovalLineRepository);
}
