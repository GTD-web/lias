import { Injectable } from '@nestjs/common';
import { DomainCategoryRepository } from './category.repository';
import { BaseService } from '../../../common/services/base.service';
import { Category } from './category.entity';

@Injectable()
export class DomainCategoryService extends BaseService<Category> {
    constructor(private readonly categoryRepository: DomainCategoryRepository) {
        super(categoryRepository);
    }
}

