import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainCommentRepository extends BaseRepository<Comment> {
    constructor(repository: Repository<Comment>);
}
