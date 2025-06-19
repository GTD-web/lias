import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ApprovalLineType, ApprovalStepType, ApproverType, DepartmentScopeType } from 'src/common/enums/approval.enum';
import { Column } from 'typeorm';

export class CreateFormApprovalStepDto {
    @IsEnum(ApprovalStepType)
    @IsNotEmpty()
    @ApiProperty({
        enum: ApprovalStepType,
        description: '결재 단계 타입',
        example: '결재',
    })
    type: ApprovalStepType;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: '결재 단계 순서',
        example: 1,
    })
    order: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '기본 결재자 ID',
        example: '1',
        required: false,
    })
    defaultApproverId: string;
}

export class CreateFormApprovalLineDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: '결재선 이름',
        example: '결재선 1',
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: '결재선 설명',
        example: '결재선 1 설명',
        required: false,
    })
    description?: string;

    @IsEnum(ApprovalLineType)
    @IsNotEmpty()
    @ApiProperty({
        enum: ApprovalLineType,
        description: '결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화)',
        example: ApprovalLineType.COMMON,
    })
    type: ApprovalLineType;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: CreateFormApprovalStepDto,
        description: '결재선 단계',
        example: [
            {
                type: '결재',
                order: 1,
                approverType: 'USER',
                approverValue: '1',
                departmentScopeType: 'SELECTED',
                isMandatory: true,
                defaultApproverId: '1',
            },
        ],
    })
    formApprovalSteps: CreateFormApprovalStepDto[];
}

export class UpdateFormApprovalLineDto extends PartialType(CreateFormApprovalLineDto) {}

export class ApproverResponseDto {
    @ApiProperty({
        description: '결재자 ID',
        example: '1',
    })
    employeeId: string;

    @ApiProperty({
        description: '결재자 이름',
        example: '홍길동',
    })
    name: string;

    @ApiProperty({
        description: '결재자 사번',
        example: '1234567890',
    })
    employeeNumber: string;

    @ApiProperty({
        description: '결재자 부서',
        example: '1234567890',
    })
    department: string;

    @ApiProperty({
        description: '결재자 직책',
        example: '1234567890',
    })
    position: string;

    @ApiProperty({
        description: '결재자 직급',
        example: '1234567890',
    })
    rank: string;
}

export class FormApprovalStepResponseDto {
    @ApiProperty({
        description: '결재선 단계 ID',
        example: '1',
    })
    formApprovalStepId: string;

    @ApiProperty({
        description: '결재선 단계 타입',
        example: '결재',
    })
    type: ApprovalStepType;

    @ApiProperty({
        description: '결재선 단계 순서',
        example: 1,
    })
    order: number;

    @ApiProperty({
        type: ApproverResponseDto,
        description: '기본 결재자',
        example: {
            employeeId: '1',
            name: '홍길동',
            employeeNumber: '1234567890',
            department: '1234567890',
            position: '1234567890',
        },
    })
    defaultApprover: ApproverResponseDto;
}

export class FormApprovalLineResponseDto {
    @ApiProperty({
        description: '결재선 ID',
        example: '1',
    })
    formApprovalLineId: string;

    @ApiProperty({
        description: '결재선 이름',
        example: '결재선 1',
    })
    name: string;

    @ApiProperty({
        description: '결재선 설명',
        example: '결재선 1 설명',
    })
    description: string;

    @ApiProperty({
        description: '결재선 타입',
        example: 'COMMON',
    })
    type: ApprovalLineType;

    @ApiProperty({
        description: '결재선 사용 여부',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: '결재선 정렬 순서',
        example: 1,
    })
    order: number;

    @ApiProperty({
        description: '결재선 생성일',
        example: '2021-01-01',
    })
    createdAt: Date;

    @ApiProperty({
        description: '결재선 수정일',
        example: '2021-01-01',
    })
    updatedAt: Date;

    @ApiProperty({
        type: FormApprovalStepResponseDto,
        description: '결재선 단계',
        example: [
            {
                formApprovalStepId: '1',
                type: '결재',
                order: 1,
                approverType: 'USER',
                approverValue: '1',
            },
        ],
    })
    formApprovalSteps: FormApprovalStepResponseDto[];
}
