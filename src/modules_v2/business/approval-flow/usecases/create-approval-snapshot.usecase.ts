import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateSnapshotRequestDto, ApprovalSnapshotResponseDto } from '../dtos';

/**
 * 결재 스냅샷 생성 Usecase
 * 기안 시 호출되어 assignee_rule을 해석하고 실제 결재선을 고정
 */
@Injectable()
export class CreateApprovalSnapshotUsecase {
    private readonly logger = new Logger(CreateApprovalSnapshotUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(dto: CreateSnapshotRequestDto): Promise<ApprovalSnapshotResponseDto> {
        this.logger.log(`결재 스냅샷 생성 요청: Document ${dto.documentId}`);

        const result = await this.approvalFlowContext.createApprovalSnapshot({
            documentId: dto.documentId,
            formVersionId: dto.formVersionId,
            draftContext: dto.draftContext,
        });

        this.logger.log(`결재 스냅샷 생성 완료: ${result.id}`);

        return {
            id: result.id,
            documentId: result.documentId,
            frozenAt: result.frozenAt,
        };
    }
}
