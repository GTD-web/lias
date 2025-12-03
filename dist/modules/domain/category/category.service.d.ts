import { QueryRunner } from 'typeorm';
import { DomainCategoryRepository } from './category.repository';
import { BaseService } from '../../../common/services/base.service';
import { Category } from './category.entity';
export declare class DomainCategoryService extends BaseService<Category> {
    private readonly categoryRepository;
    constructor(categoryRepository: DomainCategoryRepository);
    createCategory(params: {
        name: string;
        code: string;
        description?: string;
        order?: number;
    }, queryRunner?: QueryRunner): Promise<Category>;
    updateCategory(category: Category, params: {
        name?: string;
        code?: string;
        description?: string;
        order?: number;
    }, queryRunner?: QueryRunner): Promise<Category>;
}
