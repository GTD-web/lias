import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainCategoryRepository extends BaseRepository<Category> {
    constructor(
        @InjectRepository(Category)
        repository: Repository<Category>,
    ) {
        super(repository);
    }
}
