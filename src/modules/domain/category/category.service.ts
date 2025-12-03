import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DomainCategoryRepository } from './category.repository';
import { BaseService } from '../../../common/services/base.service';
import { Category } from './category.entity';

@Injectable()
export class DomainCategoryService extends BaseService<Category> {
    constructor(private readonly categoryRepository: DomainCategoryRepository) {
        super(categoryRepository);
    }

    /**
     * 카테고리를 생성한다
     */
    async createCategory(
        params: {
            name: string;
            code: string;
            description?: string;
            order?: number;
        },
        queryRunner?: QueryRunner,
    ): Promise<Category> {
        const category = new Category();

        category.이름을설정한다(params.name);
        category.코드를설정한다(params.code);

        if (params.description) {
            category.설명을설정한다(params.description);
        }
        if (params.order !== undefined) {
            category.정렬순서를설정한다(params.order);
        }

        return await this.categoryRepository.save(category, { queryRunner });
    }

    /**
     * 카테고리를 수정한다
     */
    async updateCategory(
        category: Category,
        params: {
            name?: string;
            code?: string;
            description?: string;
            order?: number;
        },
        queryRunner?: QueryRunner,
    ): Promise<Category> {
        if (params.name) {
            category.이름을설정한다(params.name);
        }
        if (params.code) {
            category.코드를설정한다(params.code);
        }
        if (params.description !== undefined) {
            category.설명을설정한다(params.description);
        }
        if (params.order !== undefined) {
            category.정렬순서를설정한다(params.order);
        }

        return await this.categoryRepository.save(category, { queryRunner });
    }
}

