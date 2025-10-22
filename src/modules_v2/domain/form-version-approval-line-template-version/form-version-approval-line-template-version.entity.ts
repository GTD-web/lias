import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { FormVersion } from '../form/form-version.entity';
import { ApprovalLineTemplateVersion } from '../approval-line-template/approval-line-template-version.entity';

/**
 * FormVersionApprovalLineTemplateVersion 엔티티
 * 문서 양식 버전과 결재선 템플릿 버전의 M:N 관계를 나타냅니다.
 * 하나의 양식 버전에 여러 결재선 템플릿을 연결할 수 있으며,
 * 그 중 하나를 기본 결재선으로 지정할 수 있습니다.
 */
@Entity('form_version_approval_line_template_versions')
@Index(['formVersionId', 'approvalLineTemplateVersionId'], { unique: true })
@Index(['formVersionId', 'isDefault'])
export class FormVersionApprovalLineTemplateVersion {
    @PrimaryGeneratedColumn('uuid', { comment: '매핑 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '양식 버전 ID' })
    formVersionId: string;

    @Column({ type: 'uuid', comment: '결재선 템플릿 버전 ID' })
    approvalLineTemplateVersionId: string;

    @Column({ type: 'boolean', default: false, comment: '기본 결재선 여부' })
    isDefault: boolean;

    @Column({ type: 'int', default: 0, comment: '표시 순서' })
    displayOrder: number;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => FormVersion, (version) => version.approvalLineTemplateMappings, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'formVersionId' })
    formVersion: FormVersion;

    @ManyToOne(() => ApprovalLineTemplateVersion, (version) => version.formVersionMappings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'approvalLineTemplateVersionId' })
    approvalLineTemplateVersion: ApprovalLineTemplateVersion;
}
