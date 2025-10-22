import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CancelApprovalRequestDto } from '../dtos';

/**
 * 결재 취소 유스케이스
 */
@Injectable()
export class CancelApprovalUsecase {
    private readonly logger = new Logger(CancelApprovalUsecase.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    async execute(drafterId: string, dto: CancelApprovalRequestDto) {
        this.logger.log(`결재 취소 요청 (기안자: ${drafterId}): ${dto.documentId}`);

        const cancelledDocument = await this.approvalProcessContext.cancelApproval({
            documentId: dto.documentId,
            drafterId,
            reason: dto.reason,
        });

        this.logger.log(`결재 취소 완료: ${cancelledDocument.id}`);
        return cancelledDocument;
    }
}
