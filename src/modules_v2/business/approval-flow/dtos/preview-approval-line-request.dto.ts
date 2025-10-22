import { IsNotEmpty, IsUUID, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PreviewApprovalLineRequestDto {
    @ApiProperty({
        description: '문서양식 버전 ID',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsNotEmpty()
    @IsUUID()
    formVersionId: string;

    @ApiProperty({
        description: '기안 부서 ID (선택사항 - 미입력시 직원의 주 소속 부서 자동 사용)',
        example: '123e4567-e89b-12d3-a456-426614174002',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    drafterDepartmentId?: string;

    @ApiProperty({
        description: '문서 금액 (금액 기반 결재선용)',
        example: 1000000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    documentAmount?: number;

    @ApiProperty({
        description: '문서 유형',
        example: 'BUDGET',
        required: false,
    })
    @IsOptional()
    @IsString()
    documentType?: string;
}
