import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { ApprovalLineType, DepartmentScopeType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';

/**
 * ApprovalLineTemplate 엔티티
 * 결재선 템플릿의 메타데이터를 관리합니다.
 * 조직 전체 또는 특정 부서에서 공유 가능합니다.
 */
@Entity('approval_line_templates')
@Index(['status'])
@Index(['type'])
export class ApprovalLineTemplate {
    @PrimaryGeneratedColumn('uuid', { comment: '결재선 템플릿 ID' })
    id: string;

    @Column({ comment: '결재선 이름' })
    name: string;

    @Column({ type: 'text', nullable: true, comment: '결재선 설명' })
    description?: string;

    @Column({
        type: 'enum',
        enum: ApprovalLineType,
        comment: '결재선 타입 (공통/개인)',
    })
    type: ApprovalLineType;

    @Column({
        type: 'enum',
        enum: DepartmentScopeType,
        default: DepartmentScopeType.ALL,
        comment: '조직 범위 (ALL: 전사 공통, SPECIFIC_DEPARTMENT: 특정 부서 전용)',
    })
    orgScope: DepartmentScopeType;

    @Column({ type: 'uuid', nullable: true, comment: '부서 ID (SPECIFIC_DEPARTMENT인 경우 필수)' })
    departmentId?: string;

    @Column({
        type: 'enum',
        enum: ApprovalLineTemplateStatus,
        default: ApprovalLineTemplateStatus.DRAFT,
        comment: '결재선 템플릿 상태',
    })
    status: ApprovalLineTemplateStatus;

    @Column({ type: 'uuid', nullable: true, comment: '현재 활성 버전 ID' })
    currentVersionId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '작성자 ID' })
    createdBy?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne('ApprovalLineTemplateVersion')
    @JoinColumn({ name: 'currentVersionId' })
    currentVersion?: any;

    @OneToMany('ApprovalLineTemplateVersion', 'template')
    versions: any[];
}
