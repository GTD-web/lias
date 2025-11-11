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
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';
import { ApprovalStepTemplate } from '../approval-step-template/approval-step-template.entity';
import { Category } from '../category/category.entity';

/**
 * DocumentTemplate 엔티티
 * 문서 양식의 메타데이터를 관리하며, 버전 관리를 통해 변경 이력을 추적합니다.
 */
@Entity('document_templates')
@Index(['status'])
@Index(['categoryId'])
export class DocumentTemplate {
    @PrimaryGeneratedColumn('uuid', { comment: '문서 템플릿 ID' })
    id: string;

    @Column({ comment: '문서 템플릿 이름' })
    name: string;

    @Column({ unique: true, comment: '문서 템플릿 코드' })
    code: string;

    @Column({ type: 'text', nullable: true, comment: '문서 템플릿 설명' })
    description?: string;

    @Column({
        type: 'enum',
        enum: DocumentTemplateStatus,
        default: DocumentTemplateStatus.DRAFT,
        comment: '문서 템플릿 상태',
    })
    status: DocumentTemplateStatus;

    @Column({ type: 'text', comment: '문서 HTML 템플릿' })
    template: string;

    @Column({ type: 'uuid', nullable: true, comment: '카테고리 ID' })
    categoryId?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => Category, (category) => category.documentTemplates, { nullable: true })
    @JoinColumn({ name: 'categoryId' })
    category?: Category;

    @OneToMany(() => ApprovalStepTemplate, (step) => step.documentTemplate, { cascade: true })
    approvalStepTemplates: ApprovalStepTemplate[];
}
