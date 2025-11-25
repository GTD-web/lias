import { DomainCommentRepository } from './comment.repository';
import { BaseService } from '../../../common/services/base.service';
import { Comment } from './comment.entity';
export declare class DomainCommentService extends BaseService<Comment> {
    private readonly commentRepository;
    constructor(commentRepository: DomainCommentRepository);
}
