import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormApprovalLineRepository } from './form-approval-line.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalLine } from '../../../database/entities';

@Injectable()
export class DomainFormApprovalLineService extends BaseService<FormApprovalLine> {
    constructor(private readonly formApprovalLineRepository: DomainFormApprovalLineRepository) {
        super(formApprovalLineRepository);
    }
}
