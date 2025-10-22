import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { Form } from './form.entity';
import { FormVersionApprovalLineTemplateVersion } from '../form-version-approval-line-template-version/form-version-approval-line-template-version.entity';
import { Document } from '../document/document.entity';

/**
 * FormVersion 엔티티
 * 문서 양식의 특정 버전을 나타냅니다.
 * 각 버전은 독립적인 템플릿 내용과 설정을 가집니다.
 */
@Entity('form_versions')
@Index(['formId', 'versionNo'], { unique: true })
@Index(['formId', 'isActive'])
export class FormVersion {
    @PrimaryGeneratedColumn('uuid', { comment: '양식 버전 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '문서 양식 ID' })
    formId: string;

    @Column({ type: 'int', comment: '버전 번호 (1부터 시작)' })
    versionNo: number;

    @Column({ type: 'text', comment: '문서 양식 HTML 템플릿' })
    template: string;

    @Column({ type: 'boolean', default: false, comment: '현재 활성 버전 여부' })
    isActive: boolean;

    @Column({ type: 'text', nullable: true, comment: '버전 변경 사유' })
    changeReason?: string;

    @Column({ type: 'uuid', nullable: true, comment: '작성자 ID' })
    createdBy?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => Form, (form) => form.versions)
    @JoinColumn({ name: 'formId' })
    form: Form;

    @OneToMany(() => FormVersionApprovalLineTemplateVersion, (mapping) => mapping.formVersion)
    approvalLineTemplateMappings: FormVersionApprovalLineTemplateVersion[];

    @OneToMany(() => Document, (document) => document.formVersion)
    documents: Document[];
}
