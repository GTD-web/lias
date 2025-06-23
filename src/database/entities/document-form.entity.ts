import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentType } from './document-type.entity';
import { ReferencerInfo, ImplementerInfo } from '../../common/types/entity.type';

@Entity('document_forms')
export class DocumentForm {
    @PrimaryGeneratedColumn('uuid')
    documentFormId: string;

    @Column({ comment: '문서 양식 이름' })
    name: string;

    @Column({ comment: '문서 양식 설명', nullable: true })
    description: string;

    @Column({ type: 'text', comment: '문서 양식 html' })
    template: string;

    @Column({ type: 'jsonb', comment: '수신 및 참조자 정보 객체', nullable: true })
    receiverInfo: ReferencerInfo[];

    @Column({ type: 'jsonb', comment: '시행자 정보 객체', nullable: true })
    implementerInfo: ImplementerInfo[];

    @Column({ comment: '결재선 ID' })
    formApprovalLineId: string;

    @ManyToOne(() => FormApprovalLine, (formApprovalLine) => formApprovalLine.documentForms)
    @JoinColumn({ name: 'formApprovalLineId' })
    formApprovalLine: FormApprovalLine;

    // document type
    @Column({ comment: '문서 양식 타입 ID' })
    documentTypeId: string;

    @ManyToOne(() => DocumentType, (documentType) => documentType.documentForms)
    @JoinColumn({ name: 'documentTypeId' })
    documentType: DocumentType;
}
