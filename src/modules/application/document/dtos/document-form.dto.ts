import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';

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

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 양식 타입 ID',
        example: 'uuid',
        required: true,
    })
    documentTypeId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: '결재선 ID',
        example: 'uuid',
        required: true,
    })
    formApprovalLineId: string;
}

export class UpdateDocumentFormDto extends PartialType(CreateDocumentFormDto) {}

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
        description: '문서 양식 타입 ID',
        example: 'uuid',
    })
    documentType: DocumentTypeResponseDto;

    @ApiProperty({
        type: FormApprovalLineResponseDto,
        description: '결재선',
    })
    formApprovalLine: FormApprovalLineResponseDto;
}
