import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import {
    ApproveStepDto,
    RejectStepDto,
    CompleteAgreementDto,
    CompleteImplementationDto,
    CancelApprovalDto,
    ProcessApprovalActionDto,
    ApprovalActionType,
} from '../dtos';

/**
 * 결재 프로세스 비즈니스 서비스
 * 결재 승인/반려, 협의 완료, 시행 완료, 결재 취소 등의 비즈니스 로직을 담당합니다.
 */
@Injectable()
export class ApprovalProcessService {
    private readonly logger = new Logger(ApprovalProcessService.name);

    constructor(private readonly approvalProcessContext: ApprovalProcessContext) {}

    /**
     * 결재 승인
     */
    async approveStep(dto: ApproveStepDto) {
        this.logger.log(`결재 승인 요청: ${dto.stepSnapshotId}`);
        return await this.approvalProcessContext.approveStep(dto);
    }

    /**
     * 결재 반려
     */
    async rejectStep(dto: RejectStepDto) {
        this.logger.log(`결재 반려 요청: ${dto.stepSnapshotId}`);
        return await this.approvalProcessContext.rejectStep(dto);
    }

    /**
     * 협의 완료
     */
    async completeAgreement(dto: CompleteAgreementDto) {
        this.logger.log(`협의 완료 요청: ${dto.stepSnapshotId}`);
        return await this.approvalProcessContext.completeAgreement(dto);
    }

    /**
     * 시행 완료
     */
    async completeImplementation(dto: CompleteImplementationDto) {
        this.logger.log(`시행 완료 요청: ${dto.stepSnapshotId}`);
        return await this.approvalProcessContext.completeImplementation(dto);
    }

    /**
     * 결재 취소
     */
    async cancelApproval(dto: CancelApprovalDto) {
        this.logger.log(`결재 취소 요청: ${dto.documentId}`);
        return await this.approvalProcessContext.cancelApproval(dto);
    }

    /**
     * 내 결재 대기 목록 조회
     */
    async getMyPendingApprovals(approverId: string) {
        this.logger.debug(`내 결재 대기 목록 조회: ${approverId}`);
        return await this.approvalProcessContext.getMyPendingApprovals(approverId);
    }

    /**
     * 문서의 결재 단계 목록 조회
     */
    async getApprovalSteps(documentId: string) {
        this.logger.debug(`문서 결재 단계 목록 조회: ${documentId}`);
        return await this.approvalProcessContext.getApprovalSteps(documentId);
    }

    /**
     * 통합 결재 액션 처리
     * 승인, 반려, 협의 완료, 시행 완료, 취소를 하나의 API로 처리합니다.
     */
    async processApprovalAction(dto: ProcessApprovalActionDto) {
        this.logger.log(`통합 결재 액션 처리 요청: ${dto.type}`);

        switch (dto.type) {
            case ApprovalActionType.APPROVE:
                if (!dto.stepSnapshotId) {
                    throw new BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.approveStep({
                    stepSnapshotId: dto.stepSnapshotId,
                    approverId: dto.approverId,
                    comment: dto.comment,
                });

            case ApprovalActionType.REJECT:
                if (!dto.stepSnapshotId) {
                    throw new BadRequestException('stepSnapshotId는 필수입니다.');
                }
                if (!dto.comment) {
                    throw new BadRequestException('반려 시 사유(comment)는 필수입니다.');
                }
                return await this.rejectStep({
                    stepSnapshotId: dto.stepSnapshotId,
                    approverId: dto.approverId,
                    comment: dto.comment,
                });

            case ApprovalActionType.COMPLETE_AGREEMENT:
                if (!dto.stepSnapshotId) {
                    throw new BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.completeAgreement({
                    stepSnapshotId: dto.stepSnapshotId,
                    agreerId: dto.approverId,
                    comment: dto.comment,
                });

            case ApprovalActionType.COMPLETE_IMPLEMENTATION:
                if (!dto.stepSnapshotId) {
                    throw new BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.completeImplementation({
                    stepSnapshotId: dto.stepSnapshotId,
                    implementerId: dto.approverId,
                    comment: dto.comment,
                    resultData: dto.resultData,
                });

            case ApprovalActionType.CANCEL:
                if (!dto.documentId) {
                    throw new BadRequestException('documentId는 필수입니다.');
                }
                if (!dto.reason) {
                    throw new BadRequestException('취소 사유(reason)는 필수입니다.');
                }
                return await this.cancelApproval({
                    documentId: dto.documentId,
                    drafterId: dto.approverId,
                    reason: dto.reason,
                });

            default:
                throw new BadRequestException(`지원하지 않는 액션 타입입니다: ${dto.type}`);
        }
    }
}
