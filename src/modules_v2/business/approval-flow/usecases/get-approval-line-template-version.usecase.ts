import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';

@Injectable()
export class GetApprovalLineTemplateVersionUsecase {
    private readonly logger = new Logger(GetApprovalLineTemplateVersionUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(templateId: string, versionId: string) {
        this.logger.debug(`결재선 템플릿 버전 조회 실행: templateId=${templateId}, versionId=${versionId}`);

        const templateVersion = await this.approvalFlowContext.getApprovalLineTemplateVersion(templateId, versionId);

        if (!templateVersion) {
            throw new NotFoundException(`결재선 템플릿 버전을 찾을 수 없습니다: ${versionId}`);
        }

        // Step 정보 조회 및 직원/부서 정보 추가
        const steps = await this.approvalFlowContext.getApprovalStepTemplatesWithDetails(versionId);

        return {
            ...templateVersion,
            steps,
        };
    }
}
