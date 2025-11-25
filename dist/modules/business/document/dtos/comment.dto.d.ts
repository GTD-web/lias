export declare class CreateCommentDto {
    content: string;
    parentCommentId?: string;
}
export declare class UpdateCommentDto {
    authorId: string;
    content: string;
}
export declare class DeleteCommentDto {
    authorId: string;
}
export declare class CommentResponseDto {
    id: string;
    documentId: string;
    authorId: string;
    content: string;
    parentCommentId?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    author?: {
        id: string;
        name: string;
        employeeNumber: string;
    };
    replies?: CommentResponseDto[];
}
