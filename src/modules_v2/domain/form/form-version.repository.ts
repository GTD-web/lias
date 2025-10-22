import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormVersion } from './form-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainFormVersionRepository extends BaseRepository<FormVersion> {
    constructor(
        @InjectRepository(FormVersion)
        repository: Repository<FormVersion>,
    ) {
        super(repository);
    }

    async findByFormId(formId: string): Promise<FormVersion[]> {
        return this.repository.find({
            where: { formId },
            order: { versionNo: 'DESC' },
        });
    }

    async findActiveVersion(formId: string): Promise<FormVersion | null> {
        return this.repository.findOne({
            where: { formId, isActive: true },
        });
    }

    async findByFormIdAndVersionNo(formId: string, versionNo: number): Promise<FormVersion | null> {
        return this.repository.findOne({
            where: { formId, versionNo },
        });
    }
}
