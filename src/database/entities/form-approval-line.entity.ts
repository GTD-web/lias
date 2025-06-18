import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { DocumentForm } from './document-form.entity';
import { FormApprovalStep } from './form-approval-step.entity';
import { Employee } from './employee.entity';
import { ApprovalLineType } from 'src/common/enums/approval.enum';

@Entity('form-approval-lines')
export class FormApprovalLine {
    @PrimaryGeneratedColumn('uuid')
    formApprovalLineId: string;

    @Column({ comment: '결재 라인 이름' })
    name: string;

    @Column({ comment: '결재 라인 설명', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ApprovalLineType,
        comment: '결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화)',
        default: ApprovalLineType.COMMON,
    })
    type: ApprovalLineType;

    @Column({ comment: '결재 라인 사용 여부', default: true })
    isActive: boolean;

    @Column({ comment: '결재 라인 정렬 순서', default: 0 })
    order: number;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column({ nullable: true, comment: '개인화된 결재라인의 경우 사용자 ID' })
    employeeId: string;

    @OneToMany(() => DocumentForm, (documentForm) => documentForm.formApprovalLine)
    documentForms: DocumentForm[];

    @ManyToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @OneToMany(() => FormApprovalStep, (formApprovalStep) => formApprovalStep.formApprovalLine)
    formApprovalSteps: FormApprovalStep[];
}
