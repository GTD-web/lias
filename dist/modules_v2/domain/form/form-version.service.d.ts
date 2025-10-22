import { DomainFormVersionRepository } from './form-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormVersion } from './form-version.entity';
export declare class DomainFormVersionService extends BaseService<FormVersion> {
    private readonly formVersionRepository;
    constructor(formVersionRepository: DomainFormVersionRepository);
    findByFormVersionId(id: string): Promise<FormVersion>;
    findByFormId(formId: string): Promise<FormVersion[]>;
    findActiveVersion(formId: string): Promise<FormVersion>;
    findByFormIdAndVersionNo(formId: string, versionNo: number): Promise<FormVersion>;
}
