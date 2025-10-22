import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormVersionRepository } from './form-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormVersion } from './form-version.entity';

@Injectable()
export class DomainFormVersionService extends BaseService<FormVersion> {
    constructor(private readonly formVersionRepository: DomainFormVersionRepository) {
        super(formVersionRepository);
    }

    async findByFormVersionId(id: string): Promise<FormVersion> {
        const formVersion = await this.formVersionRepository.findOne({ where: { id } });
        if (!formVersion) {
            throw new NotFoundException('양식 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }

    async findByFormId(formId: string): Promise<FormVersion[]> {
        return this.formVersionRepository.findByFormId(formId);
    }

    async findActiveVersion(formId: string): Promise<FormVersion> {
        const formVersion = await this.formVersionRepository.findActiveVersion(formId);
        if (!formVersion) {
            throw new NotFoundException('활성 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }

    async findByFormIdAndVersionNo(formId: string, versionNo: number): Promise<FormVersion> {
        const formVersion = await this.formVersionRepository.findByFormIdAndVersionNo(formId, versionNo);
        if (!formVersion) {
            throw new NotFoundException('양식 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }
}
