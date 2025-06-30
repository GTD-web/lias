import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDocumentTypeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 타입 이름',
        example: 'VACATION',
        required: true,
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 번호 코드 (ex. 휴가, 출결, 출장 등)',
        example: 'VAC-001',
        required: true,
    })
    documentNumberCode: string;
}

export class UpdateDocumentTypeDto extends PartialType(CreateDocumentTypeDto) {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: '문서 타입 ID',
        example: 'uuid',
        required: true,
    })
    documentTypeId: string;
}

export class DocumentTypeResponseDto {
    @ApiProperty({
        description: '문서 타입 ID',
        example: 'uuid',
    })
    documentTypeId: string;

    @ApiProperty({
        description: '문서 타입 이름',
        example: 'VACATION',
    })
    name: string;

    @ApiProperty({
        description: '문서 번호 코드',
        example: 'VAC-001',
    })
    documentNumberCode: string;
}
