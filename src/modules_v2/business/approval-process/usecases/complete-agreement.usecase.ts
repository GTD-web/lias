import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CompleteAgreementRequestDto } from '../dtos';

/**
 * 협의 완료 유스케이스
 */
@Injectable()
export class CompleteAgreementUsecase {
    private readonly logger = new Logger(CompleteAgreementUsecase.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    async execute(agreerId: string, dto: CompleteAgreementRequestDto) {
        this.logger.log(`협의 완료 요청 (협의자: ${agreerId}): ${dto.stepSnapshotId}`);

        const completedStep = await this.approvalProcessContext.completeAgreement({
            stepSnapshotId: dto.stepSnapshotId,
            agreerId,
            comment: dto.comment,
        });

        this.logger.log(`협의 완료: ${completedStep.id}`);
        return completedStep;
    }
}
