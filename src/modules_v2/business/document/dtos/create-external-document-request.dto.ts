import { IsNotEmpty, IsString, IsUUID, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomApprovalStepDto {
    @ApiProperty({
        description: '단계 순서',
        example: 1,
    })
    @IsNotEmpty()
    stepOrder: number;

    @ApiProperty({
        description: '단계 타입',
        example: 'APPROVAL',
    })
    @IsNotEmpty()
    @IsString()
    stepType: string;

    @ApiProperty({
        description: '필수 여부',
        example: true,
    })
    @IsNotEmpty()
    isRequired: boolean;

    @ApiProperty({
        description: '담당자 직원 ID (개별 선택시)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    employeeId?: string;

    @ApiProperty({
        description: '담당 부서 ID (부서 선택시)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @ApiProperty({
        description: '담당자 할당 규칙',
        example: 'FIXED',
    })
    @IsNotEmpty()
    @IsString()
    assigneeRule: string;
}

export class CreateExternalDocumentRequestDto {
    @ApiProperty({
        description: '문서 제목',
        example: '외부 시스템에서 생성된 문서',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: '문서 내용 (HTML 또는 문자열)',
        example: '<p>외부 시스템에서 전송된 문서 내용</p>',
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        description: '메타데이터 (JSON)',
        example: { urgency: 'high', source: 'external' },
        required: false,
    })
    @IsOptional()
    metadata?: Record<string, any>;

    @ApiProperty({
        description: '사용자 정의 결재선 단계 (문서 생성 시 결재선 지정)',
        type: [CustomApprovalStepDto],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomApprovalStepDto)
    customApprovalSteps?: CustomApprovalStepDto[];
}
