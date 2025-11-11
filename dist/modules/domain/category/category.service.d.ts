import { DomainCategoryRepository } from './category.repository';
import { BaseService } from '../../../common/services/base.service';
import { Category } from './category.entity';
export declare class DomainCategoryService extends BaseService<Category> {
    private readonly categoryRepository;
    constructor(categoryRepository: DomainCategoryRepository);
}
