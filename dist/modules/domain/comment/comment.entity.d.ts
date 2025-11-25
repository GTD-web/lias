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
}
