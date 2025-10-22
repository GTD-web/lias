import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { DocumentStatus } from '../../../common/enums/approval.enum';
import { FormVersion } from '../form/form-version.entity';
import { ApprovalLineSnapshot } from '../approval-line-snapshot/approval-line-snapshot.entity';
import { Employee } from '../employee/employee.entity';

/**
 * Document 엔티티
 * 실제 기안된 문서를 나타냅니다.
 * 특정 FormVersion을 기반으로 생성되며, 기안 시점의 결재선 스냅샷을 보유합니다.
 */
@Entity('documents')
@Index(['formVersionId'])
@Index(['drafterId'])
@Index(['status'])
@Index(['documentNumber'], { unique: true })
@Index(['createdAt'])
export class Document {
    @PrimaryGeneratedColumn('uuid', { comment: '문서 ID' })
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true, comment: '문서(품의) 번호' })
    documentNumber: string;

    @Column({ type: 'uuid', comment: '문서 양식 버전 ID' })
    formVersionId: string;

    @Column({ type: 'uuid', nullable: true, comment: '결재선 스냅샷 ID' })
    approvalLineSnapshotId?: string;

    @Column({ type: 'varchar', length: 500, comment: '문서 제목' })
    title: string;

    @Column({ type: 'text', comment: '문서 내용 (HTML)' })
    content: string;

    @Column({
        type: 'enum',
        enum: DocumentStatus,
        default: DocumentStatus.DRAFT,
        comment: '문서 상태',
    })
    status: DocumentStatus;

    @Column({ type: 'uuid', comment: '기안자 ID' })
    drafterId: string;

    @Column({ type: 'timestamp', nullable: true, comment: '기안(상신) 일시' })
    submittedAt?: Date;

    @Column({ type: 'text', nullable: true, comment: '취소 사유' })
    cancelReason?: string;

    @Column({ type: 'timestamp', nullable: true, comment: '취소 일시' })
    cancelledAt?: Date;

    @Column({ type: 'text', nullable: true, comment: '문서 비고' })
    comment?: string;

    @Column({ type: 'varchar', length: 50, nullable: true, comment: '보존 연한 (예: 10년, 영구보관)' })
    retentionPeriod?: string;

    @Column({ type: 'varchar', length: 20, nullable: true, comment: '보존 연한 단위 (예: 년, 월, 일)' })
    retentionPeriodUnit?: string;

    @Column({ type: 'date', nullable: true, comment: '보존 연한 시작일' })
    retentionStartDate?: Date;

    @Column({ type: 'date', nullable: true, comment: '보존 연한 종료일' })
    retentionEndDate?: Date;

    @Column({ type: 'date', nullable: true, comment: '시행 일자' })
    implementDate?: Date;

    @Column({ type: 'timestamp', nullable: true, comment: '결재 완료 일시' })
    approvedAt?: Date;

    @Column({ type: 'timestamp', nullable: true, comment: '반려 일시' })
    rejectedAt?: Date;

    @Column({ type: 'uuid', nullable: true, comment: '부모 문서 ID (재기안 시)' })
    parentDocumentId?: string;

    @Column({ type: 'jsonb', nullable: true, comment: '문서 메타데이터 (추가 정보)' })
    metadata?: Record<string, any>;

    @CreateDateColumn({ comment: '생성일 (기안일)' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => FormVersion, (formVersion) => formVersion.documents, {
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'formVersionId' })
    formVersion: FormVersion;

    @OneToOne(() => ApprovalLineSnapshot, { nullable: true })
    @JoinColumn({ name: 'approvalLineSnapshotId' })
    approvalLineSnapshot?: ApprovalLineSnapshot;

    @ManyToOne(() => Employee, (employee) => employee.draftDocuments)
    @JoinColumn({ name: 'drafterId' })
    drafter: Employee;

    @ManyToOne(() => Document, (document) => document.childDocuments, {
        nullable: true,
    })
    @JoinColumn({ name: 'parentDocumentId' })
    parentDocument?: Document;

    @OneToMany(() => Document, (document) => document.parentDocument)
    childDocuments: Document[];
}
