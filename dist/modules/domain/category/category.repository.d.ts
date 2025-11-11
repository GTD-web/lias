import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainCategoryRepository extends BaseRepository<Category> {
    constructor(repository: Repository<Category>);
}
