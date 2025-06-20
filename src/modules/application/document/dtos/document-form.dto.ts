import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
import { ImplementerInfo, ReferencerInfo } from 'src/common/types/entity.type';

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

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: '수신 및 참조자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
        required: true,
    })
    receiverInfo: ReferencerInfo[];

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: '시행자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
        required: true,
    })
    implementerInfo: ImplementerInfo[];

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
        description: '수신 및 참조자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
    })
    receiverInfo: ReferencerInfo[];

    @ApiProperty({
        description: '시행자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
    })
    implementerInfo: ImplementerInfo[];

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
