import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { ApproveStepRequestDto } from '../dtos';

/**
 * 결재 승인 유스케이스
 */
@Injectable()
export class ApproveStepUsecase {
    private readonly logger = new Logger(ApproveStepUsecase.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    async execute(approverId: string, dto: ApproveStepRequestDto) {
        this.logger.log(`결재 승인 요청 (결재자: ${approverId}): ${dto.stepSnapshotId}`);

        const approvedStep = await this.approvalProcessContext.approveStep({
            stepSnapshotId: dto.stepSnapshotId,
            approverId,
            comment: dto.comment,
        });

        this.logger.log(`결재 승인 완료: ${approvedStep.id}`);
        return approvedStep;
    }
}
