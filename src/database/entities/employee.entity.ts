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

    @Column({ nullable: true, comment: '액세스 토큰' })
    accessToken: string;

    @Column({ nullable: true, comment: '토큰 만료 시간', type: 'timestamp with time zone' })
    expiredAt: Date;

    @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER], comment: '사용자 역할' })
    roles: Role[];

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
