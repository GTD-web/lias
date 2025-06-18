import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { FormApprovalLine } from './form-approval-line.entity';
import { Employee } from './employee.entity';
import { ApprovalStepType, ApproverType, DepartmentScopeType } from 'src/common/enums/approval.enum';

@Entity('form-approval-steps')
export class FormApprovalStep {
    @PrimaryGeneratedColumn('uuid')
    formApprovalStepId: string;

    @Column({ type: 'enum', enum: ApprovalStepType, comment: '결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등)' })
    type: ApprovalStepType;

    @Column({ comment: '결재 단계 순서' })
    order: number;

    @Column({
        type: 'enum',
        enum: ApproverType,
        comment: '결재자 지정 방식 (ex. Enum(USER, DEPARTMENT_POSITION, POSITION, TITLE))',
    })
    approverType: ApproverType;

    @Column({ comment: '결재자 지정 값 (ex.  userId, positionCode, titleCode)' })
    approverValue: string;

    @Column({
        type: 'enum',
        enum: DepartmentScopeType,
        comment: 'DEPARTMENT_POSITION인 경우 부서 범위 타입  (ex. Enum(SELECTED, DRAFT_OWNER))',
        nullable: true,
    })
    departmentScopeType: DepartmentScopeType;

    @Column({ type: 'jsonb', comment: '결재 단계 조건 표현식', nullable: true })
    conditionExpression: object;

    @Column({ comment: '결재 단계 필수 여부' })
    isMandatory: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column({ comment: '기본 결재자 ID', nullable: true })
    defaultApproverId: string;

    @ManyToOne(() => Employee, (employee) => employee.defaultApprovers)
    @JoinColumn({ name: 'defaultApproverId' })
    defaultApprover: Employee;

    @Column({ comment: '결재 라인 템플릿 ID' })
    formApprovalLineId: string;

    @ManyToOne(() => FormApprovalLine, (formApprovalLine) => formApprovalLine.formApprovalSteps)
    @JoinColumn({ name: 'formApprovalLineId' })
    formApprovalLine: FormApprovalLine;
}
