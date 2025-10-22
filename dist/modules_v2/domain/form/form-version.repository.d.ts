import { Repository } from 'typeorm';
import { FormVersion } from './form-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFormVersionRepository extends BaseRepository<FormVersion> {
    constructor(repository: Repository<FormVersion>);
    findByFormId(formId: string): Promise<FormVersion[]>;
    findActiveVersion(formId: string): Promise<FormVersion | null>;
    findByFormIdAndVersionNo(formId: string, versionNo: number): Promise<FormVersion | null>;
}
