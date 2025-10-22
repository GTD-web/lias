import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CloneTemplateRequestDto, ApprovalLineTemplateVersionResponseDto } from '../dtos';

/**
 * 결재선 템플릿 복제 Usecase
 */
@Injectable()
export class CloneApprovalLineTemplateUsecase {
    private readonly logger = new Logger(CloneApprovalLineTemplateUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(createdBy: string, dto: CloneTemplateRequestDto): Promise<ApprovalLineTemplateVersionResponseDto> {
        this.logger.log(`결재선 템플릿 복제 요청 (생성자: ${createdBy}): ${dto.baseTemplateVersionId}`);

        const result = await this.approvalFlowContext.cloneApprovalLineTemplateVersion({
            baseTemplateVersionId: dto.baseTemplateVersionId,
            newTemplateName: dto.newTemplateName,
            stepEdits: dto.stepEdits,
            createdBy,
        });

        this.logger.log(`결재선 템플릿 복제 완료: ${result.id}`);

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
