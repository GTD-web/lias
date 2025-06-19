import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums/role-type.enum';
import { Document } from './document.entity';
import { FormApprovalStep } from './form-approval-step.entity';
import { ApprovalStep } from './approval-step.entity';
import { DocumentImplementer } from './document-implementer.entity';
import { DocumentReferencer } from './document-referencer.entity';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ comment: '사번' })
    employeeNumber: string;

    @Column({ nullable: true, comment: '이메일' })
    email: string;

    @Column({ nullable: true, comment: '부서' })
    department: string;

    @Column({ nullable: true, comment: '직책' })
    position: string;

    @Column({ nullable: true, comment: '직급' })
    rank: string;

    @OneToMany(() => Document, (document) => document.drafter)
    draftDocuments: Document[];

    @OneToMany(() => FormApprovalStep, (formApprovalStep) => formApprovalStep.defaultApprover)
    defaultApprovers: FormApprovalStep[];

    @OneToMany(() => ApprovalStep, (approvalStep) => approvalStep.approver)
    approvers: ApprovalStep[];

    @OneToMany(() => DocumentImplementer, (documentImplementer) => documentImplementer.implementer)
    implementDocuments: DocumentImplementer[];

    @OneToMany(() => DocumentReferencer, (documentReferencer) => documentReferencer.referencer)
    referencedDocuments: DocumentReferencer[];
}
