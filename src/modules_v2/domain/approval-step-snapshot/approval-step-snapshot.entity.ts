import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { ApprovalStepType, ApprovalStatus } from '../../../common/enums/approval.enum';
import { ApprovalLineSnapshot } from '../approval-line-snapshot/approval-line-snapshot.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';

/**
 * ApprovalStepSnapshot 엔티티
 * 결재선 스냅샷의 각 결재 단계를 나타냅니다.
 * 문서 기안 시점에 생성되며, 실제 결재 진행 상태를 추적합니다.
 */
@Entity('approval_step_snapshots')
@Index(['snapshotId', 'stepOrder'])
@Index(['approverId'])
@Index(['status'])
export class ApprovalStepSnapshot {
    @PrimaryGeneratedColumn('uuid', { comment: '결재 단계 스냅샷 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '결재선 스냅샷 ID' })
    snapshotId: string;

    @Column({ type: 'int', comment: '결재 단계 순서' })
    stepOrder: number;

    @Column({
        type: 'enum',
        enum: ApprovalStepType,
        comment: '결재 단계 타입',
    })
    stepType: ApprovalStepType;

    @Column({ type: 'varchar', length: 100, nullable: true, comment: 'Assignee Rule (스냅샷 시점)' })
    assigneeRule?: string;

    @Column({ type: 'uuid', comment: '결재자 ID' })
    approverId: string;

    @Column({ type: 'uuid', nullable: true, comment: '결재자 부서 ID (스냅샷 시점)' })
    approverDepartmentId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '결재자 직책 ID (스냅샷 시점)' })
    approverPositionId?: string;

    @Column({
        type: 'enum',
        enum: ApprovalStatus,
        default: ApprovalStatus.PENDING,
        comment: '결재 상태',
    })
    status: ApprovalStatus;

    @Column({ type: 'text', nullable: true, comment: '결재 의견' })
    comment?: string;

    @Column({ type: 'timestamp', nullable: true, comment: '결재 완료 시간' })
    approvedAt?: Date;

    @Column({ type: 'boolean', default: true, comment: '필수 결재 여부' })
    required: boolean;

    @Column({ type: 'text', nullable: true, comment: '결재 단계 설명' })
    description?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => ApprovalLineSnapshot, (snapshot) => snapshot.steps, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'snapshotId' })
    snapshot: ApprovalLineSnapshot;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'approverId' })
    approver: Employee;

    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'approverDepartmentId' })
    approverDepartment?: Department;

    @ManyToOne(() => Position, { nullable: true })
    @JoinColumn({ name: 'approverPositionId' })
    approverPosition?: Position;
}
