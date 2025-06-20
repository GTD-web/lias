import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentForm } from './document-form.entity';
import { Document } from './document.entity';

@Entity('document_types')
export class DocumentType {
    @PrimaryGeneratedColumn('uuid')
    documentTypeId: string;

    @Column({ comment: '문서 타입 이름' })
    name: string;

    @Column({ comment: '문서 번호 코드 (ex. 휴가, 출결, 출신 등' })
    documentNumberCode: string;

    @OneToMany(() => DocumentForm, (documentForm) => documentForm.documentType)
    documentForms: DocumentForm[];
}
