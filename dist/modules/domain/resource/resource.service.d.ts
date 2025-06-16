import { DomainResourceRepository } from './resource.repository';
import { BaseService } from '@libs/services/base.service';
import { Resource } from '@libs/entities/resource.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainResourceService extends BaseService<Resource> {
    private readonly resourceRepository;
    constructor(resourceRepository: DomainResourceRepository);
    softDelete(resourceId: string, options?: IRepositoryOptions<Resource>): Promise<void>;
}
