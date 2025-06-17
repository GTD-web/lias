import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Employee } from './employee.entity';
import { DocumentForm } from './document-form.entity';
import { File } from './file.entity';
import { ApprovalStep } from './approval-step.entity';

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    documentId: string;

    @Column({ unique: true, comment: '문서(품의) 번호' })
    documentNumber: string;

    @Column({ comment: '문서(품의) 유형' })
    documentType: string;

    @Column({ comment: '문서 제목' })
    title: string;

    @Column({ type: 'text', comment: '문서 내용' })
    content: string;

    @Column({ comment: '문서 상태' })
    status: string;

    @Column({ nullable: true, comment: '보존 연한 (ex. 10년, 영구보관)' })
    retentionPeriod: string;

    @Column({ nullable: true, comment: '보존 연한 단위 (ex. 년, 월, 일)' })
    retentionPeriodUnit: string;

    @Column({ nullable: true, comment: '보존 연한 시작일' })
    retentionStartDate: Date;

    @Column({ nullable: true, comment: '보존 연한 종료일' })
    retentionEndDate: Date;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    // relations
    // employee
    @Column({ nullable: true, comment: '기안자' })
    employeeId: string;

    @ManyToOne(() => Employee, (employee) => employee.documents)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    // document form
    @Column({ nullable: true })
    documentFormId: string;

    @ManyToOne(() => DocumentForm, (documentForm) => documentForm.documents)
    @JoinColumn({ name: 'documentFormId' })
    documentForm: DocumentForm;

    // approval steps
    @OneToMany(() => ApprovalStep, (approvalStep) => approvalStep.document)
    approvalSteps: ApprovalStep[];

    // parent document
    @Column({ nullable: true })
    parentDocumentId: string;

    @ManyToOne(() => Document, (document) => document.childDocuments)
    @JoinColumn({ name: 'parentDocumentId' })
    parentDocument: Document;

    @OneToMany(() => Document, (document) => document.parentDocument)
    childDocuments: Document[];

    // files
    @OneToMany(() => File, (file) => file.document)
    files: File[];
}
