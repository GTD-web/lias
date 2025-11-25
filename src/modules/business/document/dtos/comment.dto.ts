import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

/**
 * 코멘트 작성 DTO
 */
export class CreateCommentDto {
    // @ApiProperty({
    //     description: '문서 ID',
    //     example: '550e8400-e29b-41d4-a716-446655440000',
    // })
    // @IsUUID()
    // @IsNotEmpty()
    // documentId: string;

    // @ApiProperty({
    //     description: '작성자 ID',
    //     example: '550e8400-e29b-41d4-a716-446655440001',
    // })
    // @IsUUID()
    // @IsNotEmpty()
    // authorId: string;

    @ApiProperty({
        description: '코멘트 내용',
        example: '이 문서에 대한 의견입니다.',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiPropertyOptional({
        description: '부모 코멘트 ID (대댓글인 경우)',
        example: '550e8400-e29b-41d4-a716-446655440002',
    })
    @IsUUID()
    @IsOptional()
    parentCommentId?: string;
}

/**
 * 코멘트 수정 DTO
 */
export class UpdateCommentDto {
    @ApiProperty({
        description: '작성자 ID (본인 확인용)',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    @IsUUID()
    @IsNotEmpty()
    authorId: string;

    @ApiProperty({
        description: '코멘트 내용',
        example: '수정된 코멘트 내용입니다.',
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}

/**
 * 코멘트 삭제 DTO
 */
export class DeleteCommentDto {
    @ApiProperty({
        description: '작성자 ID (본인 확인용)',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    @IsUUID()
    @IsNotEmpty()
    authorId: string;
}

/**
 * 코멘트 응답 DTO
 */
export class CommentResponseDto {
    @ApiProperty({
        description: '코멘트 ID',
        example: '550e8400-e29b-41d4-a716-446655440002',
    })
    id: string;

    @ApiProperty({
        description: '문서 ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    documentId: string;

    @ApiProperty({
        description: '작성자 ID',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    authorId: string;

    @ApiProperty({
        description: '코멘트 내용',
        example: '이 문서에 대한 의견입니다.',
    })
    content: string;

    @ApiPropertyOptional({
        description: '부모 코멘트 ID (대댓글인 경우)',
        example: '550e8400-e29b-41d4-a716-446655440003',
    })
    parentCommentId?: string;

    @ApiProperty({
        description: '작성일',
        example: '2025-01-01T00:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정일',
        example: '2025-01-01T00:00:00.000Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: '삭제일 (소프트 삭제)',
        example: '2025-01-01T00:00:00.000Z',
    })
    deletedAt?: Date;

    @ApiPropertyOptional({
        description: '작성자 정보',
    })
    author?: {
        id: string;
        name: string;
        employeeNumber: string;
    };

    @ApiPropertyOptional({
        description: '대댓글 목록',
        type: [CommentResponseDto],
    })
    replies?: CommentResponseDto[];
}
