import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';

export class StepEditRequestDto {
    @ApiProperty({ description: '단계 순서', example: 1 })
    @IsNotEmpty()
    stepOrder: number;

    @ApiProperty({
        description: '단계 유형 (AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE)',
        example: 'APPROVAL',
        enum: ApprovalStepType,
    })
    @IsNotEmpty()
    @IsEnum(ApprovalStepType)
    stepType: ApprovalStepType;

    @ApiProperty({
        description: `담당자 지정 규칙
        
**정책 변경:** 결재 단계 설정 시 기본적으로 FIXED (고정 결재자)를 사용하는 것을 권장합니다.
프론트엔드에서 조직 정보를 받아 원하는 직원을 선택한 후, assigneeRule=FIXED와 targetEmployeeId를 함께 전달하세요.

**지원 규칙:**
- FIXED: 고정 담당자 (targetEmployeeId 필수)
- DEPARTMENT_HEAD: 부서장 (targetDepartmentId 선택)
- DRAFTER_SUPERIOR: 기안자의 상위자
- POSITION_BASED: 직책 기반 (targetPositionId 필수)`,
        example: 'FIXED',
        enum: AssigneeRule,
    })
    @IsNotEmpty()
    @IsEnum(AssigneeRule)
    assigneeRule: AssigneeRule;

    @ApiPropertyOptional({ description: '대상 부서 ID (DEPARTMENT_HEAD인 경우)' })
    @IsOptional()
    @IsString()
    targetDepartmentId?: string;

    @ApiPropertyOptional({ description: '대상 직책 ID (POSITION_BASED인 경우)' })
    @IsOptional()
    @IsString()
    targetPositionId?: string;

    @ApiPropertyOptional({
        description: '대상 직원 ID (고정 담당자, FIXED인 경우 필수)',
        example: 'emp-uuid-123',
    })
    @IsOptional()
    @IsString()
    targetEmployeeId?: string;

    @ApiProperty({ description: '필수 여부', example: true })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;
}

export class CreateFormRequestDto {
    @ApiProperty({ description: '문서양식 이름', example: '휴가 신청서' })
    @IsNotEmpty()
    @IsString()
    formName: string;

    @ApiProperty({ description: '문서양식 코드', example: 'VACATION_REQUEST' })
    @IsNotEmpty()
    @IsString()
    formCode: string;

    @ApiPropertyOptional({ description: '문서양식 설명', example: '연차/반차 신청용' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: '문서양식 HTML 템플릿 (미입력 시 빈 템플릿으로 생성)',
        example: '<h1>휴가 신청서</h1><p>신청 내용: </p>',
    })
    @IsOptional()
    @IsString()
    template?: string;

    @ApiPropertyOptional({
        description:
            '기존 결재선 사용 여부 (true: 기존 참조, false: 복제 후 수정, undefined: 결재선 없음 - 문서 제출 시 자동 생성)',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    useExistingLine?: boolean;

    @ApiPropertyOptional({ description: '기존 결재선 템플릿 버전 ID (useExistingLine=true 시 필수)' })
    @IsOptional()
    @IsString()
    lineTemplateVersionId?: string;

    @ApiPropertyOptional({ description: '복제할 기준 결재선 템플릿 버전 ID (useExistingLine=false 시 필수)' })
    @IsOptional()
    @IsString()
    baseLineTemplateVersionId?: string;

    @ApiPropertyOptional({ description: '단계 수정 정보 (useExistingLine=false 시 사용)', type: [StepEditRequestDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepEditRequestDto)
    stepEdits?: StepEditRequestDto[];
}
