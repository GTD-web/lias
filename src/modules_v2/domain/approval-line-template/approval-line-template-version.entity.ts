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
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { ApprovalStepTemplate } from '../approval-step-template/approval-step-template.entity';
import { FormVersionApprovalLineTemplateVersion } from '../form-version-approval-line-template-version/form-version-approval-line-template-version.entity';
import { ApprovalLineSnapshot } from '../approval-line-snapshot/approval-line-snapshot.entity';

/**
 * ApprovalLineTemplateVersion 엔티티
 * 결재선 템플릿의 특정 버전을 나타냅니다.
 * 각 버전은 독립적인 결재 단계 구성을 가집니다.
 */
@Entity('approval_line_template_versions')
@Index(['templateId', 'versionNo'], { unique: true })
@Index(['templateId', 'isActive'])
export class ApprovalLineTemplateVersion {
    @PrimaryGeneratedColumn('uuid', { comment: '결재선 템플릿 버전 ID' })
    id: string;

    @Column({ type: 'uuid', comment: '결재선 템플릿 ID' })
    templateId: string;

    @Column({ type: 'int', comment: '버전 번호 (1부터 시작)' })
    versionNo: number;

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
    @ManyToOne(() => ApprovalLineTemplate, (template) => template.versions)
    @JoinColumn({ name: 'templateId' })
    template: ApprovalLineTemplate;

    @OneToMany(() => ApprovalStepTemplate, (step) => step.lineTemplateVersion)
    steps: ApprovalStepTemplate[];

    @OneToMany(() => FormVersionApprovalLineTemplateVersion, (mapping) => mapping.approvalLineTemplateVersion)
    formVersionMappings: FormVersionApprovalLineTemplateVersion[];

    @OneToMany(() => ApprovalLineSnapshot, (snapshot) => snapshot.sourceTemplateVersion)
    snapshots: ApprovalLineSnapshot[];
}
