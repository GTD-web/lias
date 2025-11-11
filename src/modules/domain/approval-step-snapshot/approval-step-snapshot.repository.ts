import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ApprovalStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalStepSnapshotRepository extends BaseRepository<ApprovalStepSnapshot> {
    constructor(
        @InjectRepository(ApprovalStepSnapshot)
        repository: Repository<ApprovalStepSnapshot>,
    ) {
        super(repository);
    }
}
