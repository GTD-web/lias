import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
import { AutoFillType } from 'src/common/enums/approval.enum';

export class EmployeeInfoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '직원 ID',
        example: 'uuid',
    })
    employeeId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '직원 이름',
        example: '홍길동',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '직원 직급',
        example: '사원',
    })
    rank: string;
}

export class CreateDocumentFormDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 양식 이름',
        example: '휴가신청서',
        required: true,
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '문서 양식 설명',
        example: '휴가 신청을 위한 문서 양식입니다.',
        required: false,
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 양식 html',
        example: '<div>문서 양식 템플릿</div>',
        required: true,
    })
    template: string;

    @IsEnum(AutoFillType)
    @IsOptional()
    @ApiProperty({
        description: '자동 채우기 타입',
        example: AutoFillType.NONE,
        required: false,
    })
    autoFillType: AutoFillType;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 양식 타입 ID',
        example: 'uuid',
        required: true,
    })
    documentTypeId: string;

    @IsUUID()
    @IsOptional()
    @ApiProperty({
        description: '결재선 ID',
        example: 'uuid',
        required: false,
    })
    formApprovalLineId: string;
}

export class UpdateDocumentFormDto extends PartialType(CreateDocumentFormDto) {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 양식 ID',
        example: 'uuid',
        required: true,
    })
    documentFormId: string;
}

export class DocumentFormResponseDto {
    @ApiProperty({
        description: '문서 양식 ID',
        example: 'uuid',
    })
    documentFormId: string;

    @ApiProperty({
        description: '문서 양식 이름',
        example: '휴가신청서',
    })
    name: string;

    @ApiProperty({
        description: '문서 양식 설명',
        example: '휴가 신청을 위한 문서 양식입니다.',
    })
    description: string;

    @ApiProperty({
        description: '문서 양식 html',
        example: '<div>문서 양식 템플릿</div>',
    })
    template: string;

    @ApiProperty({
        description: '자동 채우기 타입 (NONE, DRAFTER_ONLY, DRAFTER_SUPERIOR)',
        example: AutoFillType.NONE,
    })
    autoFillType: AutoFillType;

    @ApiProperty({
        type: DocumentTypeResponseDto,
        description: '문서 양식 타입 ID',
    })
    documentType: DocumentTypeResponseDto;

    @ApiProperty({
        type: FormApprovalLineResponseDto,
        description: '결재선',
    })
    formApprovalLine: FormApprovalLineResponseDto;
}
