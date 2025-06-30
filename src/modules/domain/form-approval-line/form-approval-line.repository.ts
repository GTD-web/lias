import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormApprovalLine } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainFormApprovalLineRepository extends BaseRepository<FormApprovalLine> {
    constructor(
        @InjectRepository(FormApprovalLine)
        repository: Repository<FormApprovalLine>,
    ) {
        super(repository);
    }
}
