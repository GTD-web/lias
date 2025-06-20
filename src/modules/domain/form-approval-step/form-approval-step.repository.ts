import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormApprovalStep } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IRepositoryOptions } from 'src/common/interfaces/repository.interface';

@Injectable()
export class DomainFormApprovalStepRepository extends BaseRepository<FormApprovalStep> {
    constructor(
        @InjectRepository(FormApprovalStep)
        repository: Repository<FormApprovalStep>,
    ) {
        super(repository);
    }

    async deleteByFormApprovalLineId(
        formApprovalLineId: string,
        repositoryOptions?: IRepositoryOptions<FormApprovalStep>,
    ): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;

        await repository.delete({ formApprovalLine: { formApprovalLineId } });
    }
}
