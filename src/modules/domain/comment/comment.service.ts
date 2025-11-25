import { Injectable } from '@nestjs/common';
import { DomainCommentRepository } from './comment.repository';
import { BaseService } from '../../../common/services/base.service';
import { Comment } from './comment.entity';

@Injectable()
export class DomainCommentService extends BaseService<Comment> {
    constructor(private readonly commentRepository: DomainCommentRepository) {
        super(commentRepository);
    }
}

