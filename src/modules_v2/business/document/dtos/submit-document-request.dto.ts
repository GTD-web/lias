import { IsNotEmpty, IsUUID, IsOptional, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DraftContextDto {
    @ApiProperty({
        description: '기안 부서 ID (선택사항 - 미입력시 직원의 주 소속 부서 자동 사용)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    drafterDepartmentId?: string;

    @ApiProperty({
        description: '문서 금액 (향후 금액 기반 결재선 분기용)',
        example: 1000000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    documentAmount?: number;

    @ApiProperty({
        description: '문서 유형 (향후 유형별 결재선 분기용)',
        example: 'BUDGET',
        required: false,
    })
    @IsOptional()
    @IsString()
    documentType?: string;
}

export class SubmitDocumentRequestDto {
    @ApiProperty({
        description: '기안 컨텍스트 정보',
        type: DraftContextDto,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DraftContextDto)
    draftContext: DraftContextDto;
}
