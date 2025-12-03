import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepSnapshot, ApproverSnapshotMetadata } from './approval-step-snapshot.entity';
import { ApprovalStatus, ApprovalStepType } from '../../../common/enums/approval.enum';
import { DeepPartial, QueryRunner } from 'typeorm';

@Injectable()
export class DomainApprovalStepSnapshotService extends BaseService<ApprovalStepSnapshot> {
    constructor(private readonly approvalStepSnapshotRepository: DomainApprovalStepSnapshotRepository) {
        super(approvalStepSnapshotRepository);
    }

    /**
     * 결재 단계 스냅샷 생성
     */
    async createApprovalStepSnapshot(
        dto: DeepPartial<ApprovalStepSnapshot>,
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepSnapshot> {
        const snapshot = new ApprovalStepSnapshot();

        if (dto.documentId) {
            snapshot.문서를설정한다(dto.documentId);
        }
        if (dto.stepOrder !== undefined) {
            snapshot.결재단계순서를설정한다(dto.stepOrder);
        }
        if (dto.stepType) {
            snapshot.결재단계타입을설정한다(dto.stepType);
        }
        if (dto.approverId) {
            snapshot.결재자를설정한다(dto.approverId);
        }
        if (dto.approverSnapshot) {
            snapshot.결재자스냅샷을설정한다(dto.approverSnapshot);
        }
        if (dto.comment) {
            snapshot.의견을설정한다(dto.comment);
        }
        // 기본 상태는 PENDING (대기)
        snapshot.대기한다();

        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }

    /**
     * 결재 단계 스냅샷 업데이트
     */
    async updateApprovalStepSnapshot(
        snapshot: ApprovalStepSnapshot,
        dto: DeepPartial<ApprovalStepSnapshot>,
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepSnapshot> {
        if (dto.stepOrder !== undefined) {
            snapshot.결재단계순서를설정한다(dto.stepOrder);
        }
        if (dto.stepType) {
            snapshot.결재단계타입을설정한다(dto.stepType);
        }
        if (dto.approverId) {
            snapshot.결재자를설정한다(dto.approverId);
        }
        if (dto.approverSnapshot) {
            snapshot.결재자스냅샷을설정한다(dto.approverSnapshot);
        }
        if (dto.comment) {
            snapshot.의견을설정한다(dto.comment);
        }

        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }

    /**
     * 결재 단계 승인 처리
     */
    async approveApprovalStepSnapshot(
        snapshot: ApprovalStepSnapshot,
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepSnapshot> {
        snapshot.승인한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }

    /**
     * 결재 단계 반려 처리
     */
    async rejectApprovalStepSnapshot(
        snapshot: ApprovalStepSnapshot,
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepSnapshot> {
        snapshot.반려한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }

    /**
     * 결재 단계 취소 처리
     */
    async cancelApprovalStepSnapshot(
        snapshot: ApprovalStepSnapshot,
        queryRunner?: QueryRunner,
    ): Promise<ApprovalStepSnapshot> {
        snapshot.취소한다();
        return await this.approvalStepSnapshotRepository.save(snapshot, { queryRunner });
    }
}
