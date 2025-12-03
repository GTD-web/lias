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
import { ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';
import { DocumentTemplate } from '../document-template/document-template.entity';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
import { Rank } from '../rank/rank.entity';

/**
 * ApprovalStepTemplate 엔티티
 * 문서 양식의 결재 단계 템플릿을 정의합니다.
 * 결재자 할당 규칙을 통해 동적으로 결재자를 지정할 수 있으며,
 * 기안 시 추천 결재선 역할을 하며 수정 가능합니다.
 */
@Entity('approval_step_templates')
@Index(['documentTemplateId', 'stepOrder'])
export class ApprovalStepTemplate {
    @PrimaryGeneratedColumn('uuid', { comment: '결재 단계 템플릿 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '문서 템플릿 ID' })
    documentTemplateId: string;

    @Column({ type: 'int', comment: '결재 단계 순서' })
    stepOrder: number;

    @Column({
        type: 'enum',
        enum: ApprovalStepType,
        comment: '결재 단계 타입',
    })
    stepType: ApprovalStepType;

    // TODO : 2025-11-06 결재자를 할당하는 규칙을 추가해야 합니다.
    // 규칙을 선택했을 때, 기안자부터 선택된 규칙에 맞는 직책을 가진 상급자까지 모두 결재자로 등록한다.
    // 해야할 일은 그 규칙을 의미하는 값을 어떤식으로 저장할지 (ex. enum 타입으로 고정적인 값으로 저장할 지 / 단순 문자열로 따로 검증 함수를 거쳐서 결재자를 계산하도록 할지)
    @Column({
        type: 'enum',
        enum: AssigneeRule,
        default: AssigneeRule.FIXED,
        comment: '결재자 할당 규칙',
    })
    assigneeRule: AssigneeRule;

    @Column({ type: 'uuid', nullable: true, comment: '결재자 ID ' })
    targetEmployeeId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '부서 ID' })
    targetDepartmentId?: string;

    @Column({ type: 'uuid', nullable: true, comment: '직책 ID' })
    targetPositionId?: string;

    // Relations
    @ManyToOne(() => DocumentTemplate, (documentTemplate) => documentTemplate.approvalStepTemplates, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'documentTemplateId' })
    documentTemplate: DocumentTemplate;

    @ManyToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'targetEmployeeId' })
    targetEmployee?: Employee;

    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'targetDepartmentId' })
    targetDepartment?: Department;

    @ManyToOne(() => Position, { nullable: true })
    @JoinColumn({ name: 'targetPositionId' })
    targetPosition?: Position;

    // ==================== Setter 메서드 ====================

    /**
     * 문서 템플릿을 설정한다
     */
    문서템플릿을설정한다(documentTemplateId: string): void {
        this.documentTemplateId = documentTemplateId;
    }

    /**
     * 결재 단계 순서를 설정한다
     */
    결재단계순서를설정한다(stepOrder: number): void {
        this.stepOrder = stepOrder;
    }

    /**
     * 결재 단계 타입을 설정한다
     */
    결재단계타입을설정한다(stepType: ApprovalStepType): void {
        this.stepType = stepType;
    }

    /**
     * 결재자 할당 규칙을 설정한다
     */
    결재자할당규칙을설정한다(assigneeRule: AssigneeRule): void {
        this.assigneeRule = assigneeRule;
    }

    /**
     * 대상 직원을 설정한다
     */
    대상직원을설정한다(targetEmployeeId?: string): void {
        this.targetEmployeeId = targetEmployeeId;
    }

    /**
     * 대상 부서를 설정한다
     */
    대상부서를설정한다(targetDepartmentId?: string): void {
        this.targetDepartmentId = targetDepartmentId;
    }

    /**
     * 대상 직책을 설정한다
     */
    대상직책을설정한다(targetPositionId?: string): void {
        this.targetPositionId = targetPositionId;
    }
}
