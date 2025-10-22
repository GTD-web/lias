import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CompleteImplementationRequestDto } from '../dtos';

/**
 * 시행 완료 유스케이스
 */
@Injectable()
export class CompleteImplementationUsecase {
    private readonly logger = new Logger(CompleteImplementationUsecase.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    async execute(implementerId: string, dto: CompleteImplementationRequestDto) {
        this.logger.log(`시행 완료 요청 (시행자: ${implementerId}): ${dto.stepSnapshotId}`);

        const completedStep = await this.approvalProcessContext.completeImplementation({
            stepSnapshotId: dto.stepSnapshotId,
            implementerId,
            comment: dto.comment,
            resultData: dto.resultData,
        });

        this.logger.log(`시행 완료: ${completedStep.id}`);
        return completedStep;
    }
}
