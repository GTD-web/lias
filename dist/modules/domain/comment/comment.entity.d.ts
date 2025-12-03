import { Document } from '../document/document.entity';
import { Employee } from '../employee/employee.entity';
export declare class Comment {
    id: string;
    documentId: string;
    authorId: string;
    content: string;
    parentCommentId?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    document: Document;
    author: Employee;
    parentComment?: Comment;
    replies: Comment[];
    문서를설정한다(documentId: string): void;
    작성자를설정한다(authorId: string): void;
    내용을설정한다(content: string): void;
    부모코멘트를설정한다(parentCommentId?: string): void;
    삭제한다(): void;
}
