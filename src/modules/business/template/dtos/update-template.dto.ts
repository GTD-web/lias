import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
import { ApprovalStepTemplateItemDto } from './create-template.dto';

/**
 * 결재단계 템플릿 수정 DTO (템플릿 수정 시 사용)
 */
export class UpdateApprovalStepTemplateItemDto extends ApprovalStepTemplateItemDto {
    @ApiPropertyOptional({
        description: '결재단계 템플릿 ID (수정 시 필요, 없으면 새로 생성)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    id?: string;
}

/**
 * 문서 템플릿 수정 DTO
 */
export class UpdateTemplateDto {
    @ApiPropertyOptional({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 코드',
        example: 'VAC',
    })
    @IsOptional()
    @IsString()
    code?: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    })
    @IsOptional()
    @IsString()
    template?: string;

    // @ApiPropertyOptional({
    //     description: '문서 템플릿 상태',
    //     enum: DocumentTemplateStatus,
    // })
    // @IsOptional()
    // @IsEnum(DocumentTemplateStatus)
    // status?: DocumentTemplateStatus;

    @ApiPropertyOptional({
        description: '카테고리 ID (null로 설정하면 카테고리 제거)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string | null;

    @ApiPropertyOptional({
        description: '결재단계 템플릿 목록 (id가 있으면 수정, 없으면 생성, 기존 것 중 요청에 없는 것은 삭제)',
        type: [UpdateApprovalStepTemplateItemDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateApprovalStepTemplateItemDto)
    approvalSteps?: UpdateApprovalStepTemplateItemDto[];
}
