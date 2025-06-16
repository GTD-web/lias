import { Repository } from 'typeorm';
import { Resource } from '@libs/entities/resource.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainResourceRepository extends BaseRepository<Resource> {
    constructor(repository: Repository<Resource>);
    softDelete(resourceId: string, repositoryOptions?: IRepositoryOptions<Resource>): Promise<void>;
}
