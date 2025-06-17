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

@Entity('form-approval-lines')
export class FormApprovalLine {
    @PrimaryGeneratedColumn('uuid')
    formApprovalLineId: string;

    @Column({ comment: '결재 라인 이름' })
    name: string;

    @Column({ comment: '결재 라인 설명' })
    description: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column()
    documentFormId: string;

    @ManyToOne(() => DocumentForm, (documentForm) => documentForm.formApprovalLines)
    @JoinColumn({ name: 'documentFormId' })
    documentForm: DocumentForm;

    @OneToMany(() => FormApprovalStep, (formApprovalStep) => formApprovalStep.formApprovalLine)
    formApprovalSteps: FormApprovalStep[];
}
