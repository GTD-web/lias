import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './document.entity';
import { FormApprovalLine } from './form-approval-line.entity';

@Entity('document-forms')
export class DocumentForm {
    @PrimaryGeneratedColumn('uuid')
    documentFormId: string;

    @Column({ comment: '문서 양식 타입' })
    type: string;

    @Column({ comment: '문서 양식 이름' })
    name: string;

    @Column({ comment: '문서 양식 설명' })
    description: string;

    @Column({ type: 'text', comment: '문서 양식 html' })
    template: string;

    @OneToMany(() => Document, (document) => document.documentForm)
    documents: Document[];

    @OneToMany(() => FormApprovalLine, (formApprovalLine) => formApprovalLine.documentForm)
    formApprovalLines: FormApprovalLine[];
}
