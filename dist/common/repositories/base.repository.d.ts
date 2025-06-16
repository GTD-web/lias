import { IRepository, IRepositoryOptions } from '../interfaces/repository.interface';
import { ObjectLiteral, Repository, DeepPartial } from 'typeorm';
export declare abstract class BaseRepository<T extends ObjectLiteral> implements IRepository<T> {
    protected readonly repository: Repository<T>;
    protected constructor(repository: Repository<T>);
    create(entity: DeepPartial<T>, repositoryOptions?: IRepositoryOptions<T>): Promise<T>;
    save(entity: DeepPartial<T>, repositoryOptions?: IRepositoryOptions<T>): Promise<T>;
    findOne(repositoryOptions?: IRepositoryOptions<T>): Promise<T | null>;
    findAll(repositoryOptions?: IRepositoryOptions<T>): Promise<T[]>;
    update(entityId: string, entityData: Partial<T>, repositoryOptions?: IRepositoryOptions<T>): Promise<T>;
    delete(entityId: string, repositoryOptions?: IRepositoryOptions<T>): Promise<void>;
}
