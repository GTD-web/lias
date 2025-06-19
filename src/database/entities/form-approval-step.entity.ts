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

    @Column({ type: 'enum', enum: ApprovalStepType, comment: '결재 단계 타입 (ex. 합의, 결재)' })
    type: ApprovalStepType;

    @Column({ comment: '결재 단계 순서' })
    order: number;

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
