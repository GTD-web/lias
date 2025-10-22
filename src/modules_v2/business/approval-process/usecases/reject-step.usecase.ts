import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { RejectStepRequestDto } from '../dtos';

/**
 * 결재 반려 유스케이스
 */
@Injectable()
export class RejectStepUsecase {
    private readonly logger = new Logger(RejectStepUsecase.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    async execute(approverId: string, dto: RejectStepRequestDto) {
        this.logger.log(`결재 반려 요청 (결재자: ${approverId}): ${dto.stepSnapshotId}`);

        const rejectedStep = await this.approvalProcessContext.rejectStep({
            stepSnapshotId: dto.stepSnapshotId,
            approverId,
            comment: dto.comment,
        });

        this.logger.log(`결재 반려 완료: ${rejectedStep.id}`);
        return rejectedStep;
    }
}
