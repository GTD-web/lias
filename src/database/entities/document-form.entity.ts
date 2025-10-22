import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentType } from './document-type.entity';
import { AutoFillType } from '../../common/enums/approval.enum';

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

    @Column({
        type: 'enum',
        enum: AutoFillType,
        comment: '자동 채우기 타입',
        nullable: true,
        default: AutoFillType.NONE,
    })
    autoFillType: AutoFillType;

    @Column({ comment: '결재선 ID', nullable: true })
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
