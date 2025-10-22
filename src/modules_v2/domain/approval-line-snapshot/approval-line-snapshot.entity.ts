import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';
import { ApprovalStepSnapshot } from '../approval-step-snapshot/approval-step-snapshot.entity';

/**
 * ApprovalLineSnapshot 엔티티
 * 문서 기안 시점의 결재선 상태를 불변(immutable)으로 저장합니다.
 * 원본 템플릿이 변경되어도 이미 기안된 문서의 결재선은 영향을 받지 않습니다.
 */
@Entity('approval_line_snapshots')
@Index(['documentId'], { unique: true })
@Index(['sourceTemplateVersionId'])
export class ApprovalLineSnapshot {
    @PrimaryGeneratedColumn('uuid', { comment: '결재선 스냅샷 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '문서 ID' })
    documentId: string;

    @Column({ type: 'uuid', nullable: true, comment: '원본 결재선 템플릿 버전 ID' })
    sourceTemplateVersionId?: string;

    @Column({ type: 'varchar', length: 255, comment: '스냅샷 생성 시점의 결재선 이름' })
    snapshotName: string;

    @Column({ type: 'text', nullable: true, comment: '스냅샷 생성 시점의 결재선 설명' })
    snapshotDescription?: string;

    @Column({ type: 'jsonb', nullable: true, comment: '스냅샷 메타데이터 (추가 정보)' })
    metadata?: Record<string, any>;

    @Column({ type: 'timestamp', comment: '스냅샷 생성(동결) 시점' })
    frozenAt: Date;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => ApprovalLineTemplateVersion, (version) => version.snapshots, {
        nullable: true,
    })
    @JoinColumn({ name: 'sourceTemplateVersionId' })
    sourceTemplateVersion?: ApprovalLineTemplateVersion;

    @OneToMany(() => ApprovalStepSnapshot, (step) => step.snapshot)
    steps: ApprovalStepSnapshot[];
}
