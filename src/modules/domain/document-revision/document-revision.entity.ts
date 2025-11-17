import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Document } from '../document/document.entity';
import { Employee } from '../employee/employee.entity';
import { ApprovalStepSnapshot } from '../approval-step-snapshot/approval-step-snapshot.entity';

/**
 * 문서 스냅샷 메타데이터 타입
 * 수정 시점의 Document 엔티티 정보를 그대로 보존합니다.
 */
export type DocumentSnapshotMetadata = Omit<Document, 'drafter' | 'approvalSteps' | 'revisions'>;

/**
 * 결재선 스냅샷 메타데이터 타입
 * 수정 시점의 ApprovalStepSnapshot 엔티티 정보를 그대로 보존합니다.
 */
export type ApprovalStepSnapshotMetadata = Omit<ApprovalStepSnapshot, 'document' | 'approver'>;

/**
 * DocumentRevision 엔티티
 * 문서의 수정 이력을 관리합니다.
 * 결재 중 문서가 수정될 때마다 새로운 리비전이 생성되며,
 * 수정 시점의 문서 정보와 결재선 정보를 스냅샷으로 보존합니다.
 */
@Entity('document_revisions')
@Index(['documentId', 'revisionNumber'])
@Index(['documentId', 'createdAt'])
@Index(['revisedById'])
export class DocumentRevision {
    @PrimaryGeneratedColumn('uuid', { comment: '수정 이력 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '문서 ID' })
    documentId: string;

    @Column({ type: 'int', comment: '수정 버전 번호 (1부터 시작)' })
    revisionNumber: number;

    @Column({
        type: 'jsonb',
        comment: '수정 시점의 문서 스냅샷 (Document 엔티티 전체 정보)',
    })
    documentSnapshot: DocumentSnapshotMetadata;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '수정 시점의 결재선 스냅샷 (ApprovalStepSnapshot 엔티티 배열)',
    })
    approvalStepsSnapshot?: ApprovalStepSnapshotMetadata[];

    @Column({ type: 'text', nullable: true, comment: '수정 사유/코멘트' })
    revisionComment?: string;

    @Column({ type: 'uuid', comment: '수정한 사람 ID' })
    revisedById: string;

    @CreateDateColumn({ comment: '수정 생성일' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => Document, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'documentId' })
    document: Document;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'revisedById' })
    revisedBy: Employee;
}
