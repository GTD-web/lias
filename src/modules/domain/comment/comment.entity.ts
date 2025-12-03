import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { Document } from '../document/document.entity';
import { Employee } from '../employee/employee.entity';

/**
 * Comment 엔티티
 * 결재 문서에 대한 댓글을 나타냅니다.
 * 대댓글(nested comment)을 지원합니다.
 */
@Entity('comments')
@Index(['documentId'])
@Index(['authorId'])
@Index(['parentCommentId'])
@Index(['createdAt'])
export class Comment {
    @PrimaryGeneratedColumn('uuid', { comment: '댓글 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '문서 ID' })
    documentId: string;

    @Column({ type: 'uuid', comment: '작성자 ID' })
    authorId: string;

    @Column({ type: 'text', comment: '댓글 내용' })
    content: string;

    @Column({ type: 'uuid', nullable: true, comment: '부모 댓글 ID (대댓글인 경우)' })
    parentCommentId?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일 (소프트 삭제)' })
    deletedAt?: Date;

    // Relations
    @ManyToOne(() => Document, (document) => document.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'documentId' })
    document: Document;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'authorId' })
    author: Employee;

    @ManyToOne(() => Comment, (comment) => comment.replies, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parentCommentId' })
    parentComment?: Comment;

    @OneToMany(() => Comment, (comment) => comment.parentComment)
    replies: Comment[];

    // ==================== Setter 메서드 ====================

    /**
     * 문서를 설정한다
     */
    문서를설정한다(documentId: string): void {
        this.documentId = documentId;
    }

    /**
     * 작성자를 설정한다
     */
    작성자를설정한다(authorId: string): void {
        this.authorId = authorId;
    }

    /**
     * 내용을 설정한다
     */
    내용을설정한다(content: string): void {
        this.content = content;
    }

    /**
     * 부모 코멘트를 설정한다
     */
    부모코멘트를설정한다(parentCommentId?: string): void {
        this.parentCommentId = parentCommentId;
    }

    /**
     * 삭제한다 (소프트 삭제)
     */
    삭제한다(): void {
        this.deletedAt = new Date();
    }
}
