import { IsString, IsOptional, IsArray, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { Document } from 'src/database/entities/document.entity';
import { File } from 'src/database/entities/file.entity';

export class CreateApprovalStepDto {
    @ApiProperty({ description: '결재 단계 타입' })
    @IsString()
    @IsNotEmpty()
    type: ApprovalStepType;

    @ApiProperty({ description: '결재 단계 순서' })
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @ApiProperty({ description: '결재자 ID' })
    @IsString()
    @IsNotEmpty()
    approverId: string;
}

export class FileDto {
    @ApiProperty({ description: '파일 ID' })
    @IsString()
    @IsNotEmpty()
    fileId: string;

    @ApiProperty({ description: '파일 이름' })
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @ApiProperty({ description: '파일 경로' })
    @IsString()
    @IsNotEmpty()
    filePath: string;

    @ApiProperty({ description: '생성일' })
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}

export class CreateDraftDocumentDto {
    @ApiProperty({ description: '문서(품의) 번호' })
    @IsString()
    @IsNotEmpty()
    documentNumber: string;

    @ApiProperty({ description: '문서(품의) 유형' })
    @IsString()
    @IsNotEmpty()
    documentType: string;

    @ApiProperty({ description: '문서 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '문서 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: '기안자 ID', required: false })
    @IsString()
    @IsOptional()
    drafterId: string;

    @ApiProperty({ description: '결재 단계 정보 객체', type: [CreateApprovalStepDto], required: false })
    @IsArray()
    @IsNotEmpty()
    approvalSteps: CreateApprovalStepDto[];

    @ApiProperty({ description: '부모 문서 ID', required: false })
    @IsString()
    @IsOptional()
    parentDocumentId?: string;

    @ApiProperty({ description: '파일 정보 객체', type: [FileDto], required: false })
    @IsArray()
    @IsOptional()
    files: FileDto[];
}

export class UpdateDraftDocumentDto extends CreateDraftDocumentDto {}

export class EmployeeResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    employeeId: string;

    @ApiProperty({ example: '홍길동' })
    name: string;

    @ApiProperty({ example: '25001' })
    employeeNumber: string;

    @ApiProperty({ example: 'hong@lumir.space' })
    email: string;

    @ApiProperty({ example: '지상-Web' })
    department: string;

    @ApiProperty({ example: '파트장' })
    position: string;

    @ApiProperty({ example: '책임연구원' })
    rank: string;
}

export class ApprovalStepResponseDto {
    @ApiProperty({ description: '결재 단계 타입' })
    type: ApprovalStepType;

    @ApiProperty({ description: '결재 단계 순서' })
    order: number;

    @ApiProperty({ description: '결재 일시' })
    approvedDate: Date;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;

    @ApiProperty({ description: '결재자', type: EmployeeResponseDto })
    approver: EmployeeResponseDto;
}

export class ApprovalResponseDto {
    @ApiProperty({ description: '기안 ID' })
    documentId: string;

    @ApiProperty({ description: '문서 번호' })
    documentNumber: string;

    @ApiProperty({ description: '문서(품의) 유형' })
    documentType: string;

    @ApiProperty({ description: '문서 제목' })
    title: string;

    @ApiProperty({ description: '문서 내용' })
    content: string;

    @ApiProperty({ description: '문서 상태' })
    status: ApprovalStatus;

    @ApiProperty({ description: '보존 연한' })
    retentionPeriod: string;

    @ApiProperty({ description: '보존 연한 단위' })
    retentionPeriodUnit: string;

    @ApiProperty({ description: '보존 연한 시작일' })
    retentionStartDate: Date;

    @ApiProperty({ description: '보존 연한 종료일' })
    retentionEndDate: Date;

    @ApiProperty({ description: '시행 일자' })
    implementDate: Date;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;

    @ApiProperty({ description: '기안자', type: EmployeeResponseDto })
    drafter: EmployeeResponseDto;

    @ApiProperty({ description: '결재 단계 정보 객체', type: [ApprovalStepResponseDto] })
    approvalSteps: ApprovalStepResponseDto[];

    @ApiProperty({ description: '부모 문서', type: ApprovalResponseDto })
    parentDocument: ApprovalResponseDto;

    @ApiProperty({ description: '파일', type: [FileDto] })
    files: FileDto[];
}
