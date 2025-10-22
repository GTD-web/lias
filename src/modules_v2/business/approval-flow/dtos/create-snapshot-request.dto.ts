import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsObject } from 'class-validator';

export class DraftContextRequestDto {
    @ApiProperty({ description: '기안자 ID', example: 'employee-123' })
    @IsNotEmpty()
    @IsString()
    drafterId: string;

    @ApiPropertyOptional({ description: '기안자 부서 ID', example: 'dept-456' })
    @IsOptional()
    @IsString()
    drafterDepartmentId?: string;

    @ApiPropertyOptional({ description: '문서 금액 (금액 기반 결재선용)', example: 1000000 })
    @IsOptional()
    @IsNumber()
    documentAmount?: number;

    @ApiPropertyOptional({ description: '문서 유형', example: 'EXPENSE' })
    @IsOptional()
    @IsString()
    documentType?: string;

    @ApiPropertyOptional({ description: '추가 컨텍스트 정보', example: { projectId: 'proj-789' } })
    @IsOptional()
    @IsObject()
    customFields?: Record<string, any>;
}

export class CreateSnapshotRequestDto {
    @ApiProperty({ description: '문서 ID', example: 'document-123' })
    @IsNotEmpty()
    @IsString()
    documentId: string;

    @ApiProperty({ description: '문서양식 버전 ID', example: 'form-version-456' })
    @IsNotEmpty()
    @IsString()
    formVersionId: string;

    @ApiProperty({ description: '기안 컨텍스트 정보', type: DraftContextRequestDto })
    @IsNotEmpty()
    @IsObject()
    draftContext: DraftContextRequestDto;
}
