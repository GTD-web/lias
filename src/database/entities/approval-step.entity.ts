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
import { Employee } from './employee.entity';
import { Document } from './document.entity';
import { ApprovalStepType } from 'src/common/enums/approval.enum';

@Entity('approval_steps')
export class ApprovalStep {
    @PrimaryGeneratedColumn('uuid')
    approvalStepId: string;

    @Column({ type: 'enum', enum: ApprovalStepType, comment: '결재 단계 타입 (ex. 합의, 결재, 시행, 참조)' })
    type: ApprovalStepType;

    @Column({ comment: '결재 단계 순서' })
    order: number;

    @Column({ comment: '결재 승인 여부 (승인: true, 반려: false, 미결재: null)', nullable: true })
    isApproved: boolean;

    @Column({ type: 'timestamp with time zone', comment: '결재 일시', nullable: true })
    approvedDate: Date;

    @Column({ comment: '현재 단계 여부', default: false })
    isCurrent: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column({ comment: '기본 결재자 ID', nullable: true })
    approverId: string;

    @ManyToOne(() => Employee, (employee) => employee.approvers)
    @JoinColumn({ name: 'approverId' })
    approver: Employee;

    @Column({ comment: '문서 ID' })
    documentId: string;

    @ManyToOne(() => Document, (document) => document.approvalSteps)
    @JoinColumn({ name: 'documentId' })
    document: Document;
}
