import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainCommentService } from './comment.service';
import { DomainCommentRepository } from './comment.repository';
import { Comment } from './comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [DomainCommentService, DomainCommentRepository],
    exports: [DomainCommentService],
})
export class DomainCommentModule {}

