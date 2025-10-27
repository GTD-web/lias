import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApprovalLineTemplateVersionResponseDto } from './approval-flow-response.dto';
import { ApprovalStepTemplateResponseDto } from './approval-flow-response.dto';

export class ApprovalLineTemplateVersionWithStepsResponseDto extends ApprovalLineTemplateVersionResponseDto {
    @ApiPropertyOptional({ description: '결재 단계 목록', type: [ApprovalStepTemplateResponseDto] })
    steps?: ApprovalStepTemplateResponseDto[];
}
