import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainCategoryService } from './category.service';
import { DomainCategoryRepository } from './category.repository';
import { Category } from './category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [DomainCategoryService, DomainCategoryRepository],
    exports: [DomainCategoryService],
})
export class DomainCategoryModule {}

