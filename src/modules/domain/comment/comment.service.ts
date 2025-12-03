import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DomainCommentRepository } from './comment.repository';
import { BaseService } from '../../../common/services/base.service';
import { Comment } from './comment.entity';

@Injectable()
export class DomainCommentService extends BaseService<Comment> {
    constructor(private readonly commentRepository: DomainCommentRepository) {
        super(commentRepository);
    }

    /**
     * 코멘트를 생성한다
     */
    async createComment(
        params: {
            documentId: string;
            authorId: string;
            content: string;
            parentCommentId?: string;
        },
        queryRunner?: QueryRunner,
    ): Promise<Comment> {
        const comment = new Comment();

        comment.문서를설정한다(params.documentId);
        comment.작성자를설정한다(params.authorId);
        comment.내용을설정한다(params.content);

        if (params.parentCommentId) {
            comment.부모코멘트를설정한다(params.parentCommentId);
        }

        return await this.commentRepository.save(comment, { queryRunner });
    }

    /**
     * 코멘트를 수정한다
     */
    async updateComment(comment: Comment, content: string, queryRunner?: QueryRunner): Promise<Comment> {
        comment.내용을설정한다(content);
        return await this.commentRepository.save(comment, { queryRunner });
    }

    /**
     * 코멘트를 삭제한다 (소프트 삭제)
     */
    async deleteComment(comment: Comment, queryRunner?: QueryRunner): Promise<Comment> {
        comment.삭제한다();
        return await this.commentRepository.save(comment, { queryRunner });
    }
}
