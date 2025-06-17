import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainApprovalStepRepository extends BaseRepository<ApprovalStep> {
    constructor(
        @InjectRepository(ApprovalStep)
        repository: Repository<ApprovalStep>,
    ) {
        super(repository);
    }
}
