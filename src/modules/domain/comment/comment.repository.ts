import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainCommentRepository extends BaseRepository<Comment> {
    constructor(
        @InjectRepository(Comment)
        repository: Repository<Comment>,
    ) {
        super(repository);
    }
}

