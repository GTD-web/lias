import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateSnapshotRequestDto, ApprovalSnapshotResponseDto } from '../dtos';
export declare class CreateApprovalSnapshotUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(dto: CreateSnapshotRequestDto): Promise<ApprovalSnapshotResponseDto>;
}
