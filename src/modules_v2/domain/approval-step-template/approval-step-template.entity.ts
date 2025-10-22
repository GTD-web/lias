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
import { ApprovalStepType, ApproverType, AssigneeRule } from '../../../common/enums/approval.enum';
import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';

/**
 * ApprovalStepTemplate 엔티티
 * 결재선 템플릿의 각 결재 단계를 정의합니다.
 * 결재자 할당 규칙을 통해 동적으로 결재자를 지정할 수 있습니다.
 */
@Entity('approval_step_templates')
@Index(['lineTemplateVersionId', 'stepOrder'])
export class ApprovalStepTemplate {
    @PrimaryGeneratedColumn('uuid', { comment: '결재 단계 템플릿 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '결재선 템플릿 버전 ID' })
    lineTemplateVersionId: string;

    @Column({ type: 'int', comment: '결재 단계 순서' })
    stepOrder: number;

    @Column({
        type: 'enum',
        enum: ApprovalStepType,
        comment: '결재 단계 타입',
    })
    stepType: ApprovalStepType;

    @Column({
        type: 'enum',
        enum: AssigneeRule,
        default: AssigneeRule.FIXED,
        comment: '결재자 할당 규칙',
    })
    assigneeRule: AssigneeRule;

    @Column({ type: 'uuid', nullable: true, comment: '고정 결재자 ID (FIXED인 경우)' })
    defaultApproverId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '부서 ID (DEPARTMENT_HEAD인 경우)' })
    targetDepartmentId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '직책 ID (POSITION_BASED인 경우)' })
    targetPositionId?: string;

    @Column({ type: 'boolean', default: true, comment: '필수 결재 여부' })
    required: boolean;

    @Column({ type: 'text', nullable: true, comment: '결재 단계 설명' })
    description?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => ApprovalLineTemplateVersion, (version) => version.steps, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lineTemplateVersionId' })
    lineTemplateVersion: ApprovalLineTemplateVersion;

    @ManyToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'defaultApproverId' })
    defaultApprover?: Employee;

    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'targetDepartmentId' })
    targetDepartment?: Department;

    @ManyToOne(() => Position, { nullable: true })
    @JoinColumn({ name: 'targetPositionId' })
    targetPosition?: Position;
}
