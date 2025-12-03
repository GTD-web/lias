import { QueryRunner } from 'typeorm';
import { DomainCommentRepository } from './comment.repository';
import { BaseService } from '../../../common/services/base.service';
import { Comment } from './comment.entity';
export declare class DomainCommentService extends BaseService<Comment> {
    private readonly commentRepository;
    constructor(commentRepository: DomainCommentRepository);
    createComment(params: {
        documentId: string;
        authorId: string;
        content: string;
        parentCommentId?: string;
    }, queryRunner?: QueryRunner): Promise<Comment>;
    updateComment(comment: Comment, content: string, queryRunner?: QueryRunner): Promise<Comment>;
    deleteComment(comment: Comment, queryRunner?: QueryRunner): Promise<Comment>;
}
