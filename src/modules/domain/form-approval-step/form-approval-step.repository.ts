import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainFormApprovalStepRepository extends BaseRepository<FormApprovalStep> {
    constructor(
        @InjectRepository(FormApprovalStep)
        repository: Repository<FormApprovalStep>,
    ) {
        super(repository);
    }
}
