import { IRepository } from '../interfaces/repository.interface';
import { IService } from '../interfaces/service.interface';
import { IRepositoryOptions } from '../interfaces/repository.interface';
import { ObjectLiteral, DeepPartial } from 'typeorm';
export declare abstract class BaseService<T extends ObjectLiteral> implements IService<T> {
    protected readonly repository: IRepository<T>;
    protected constructor(repository: IRepository<T>);
    create(entity: DeepPartial<T>, options?: IRepositoryOptions<T>): Promise<T>;
    save(entity: DeepPartial<T>, options?: IRepositoryOptions<T>): Promise<T>;
    findAll(options?: IRepositoryOptions<T>): Promise<T[]>;
    findOne(options: IRepositoryOptions<T>): Promise<T | null>;
    update(entityId: string, entity: Partial<T>, options?: IRepositoryOptions<T>): Promise<T>;
    delete(entityId: string, options?: IRepositoryOptions<T>): Promise<void>;
}
