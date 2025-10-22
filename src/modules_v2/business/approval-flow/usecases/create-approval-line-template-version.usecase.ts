import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateTemplateVersionRequestDto, ApprovalLineTemplateVersionResponseDto } from '../dtos';

/**
 * 결재선 템플릿 새 버전 생성 Usecase
 */
@Injectable()
export class CreateApprovalLineTemplateVersionUsecase {
    private readonly logger = new Logger(CreateApprovalLineTemplateVersionUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(
        createdBy: string,
        dto: CreateTemplateVersionRequestDto,
    ): Promise<ApprovalLineTemplateVersionResponseDto> {
        this.logger.log(`결재선 템플릿 새 버전 생성 요청 (생성자: ${createdBy}): ${dto.templateId}`);

        const result = await this.approvalFlowContext.createApprovalLineTemplateVersion({
            templateId: dto.templateId,
            versionNote: dto.versionNote,
            steps: dto.steps,
            createdBy,
        });

        this.logger.log(`결재선 템플릿 새 버전 생성 완료: v${result.versionNo}`);

        return {
            id: result.id,
            templateId: result.templateId,
            versionNo: result.versionNo,
            isActive: result.isActive,
            changeReason: result.changeReason,
            createdAt: result.createdAt,
        };
    }
}
