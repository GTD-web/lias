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

    // ==================== Setter 메서드 ====================

    /**
     * 이름을 설정한다
     */
    이름을설정한다(name: string): void {
        this.name = name;
    }

    /**
     * 코드를 설정한다
     */
    코드를설정한다(code: string): void {
        this.code = code;
    }

    /**
     * 설명을 설정한다
     */
    설명을설정한다(description?: string): void {
        this.description = description;
    }

    /**
     * 템플릿을 설정한다
     */
    템플릿을설정한다(template: string): void {
        this.template = template;
    }

    /**
     * 카테고리를 설정한다
     */
    카테고리를설정한다(categoryId?: string): void {
        this.categoryId = categoryId;
    }

    /**
     * 상태를 설정한다
     */
    상태를설정한다(status: DocumentTemplateStatus): void {
        this.status = status;
    }

    /**
     * 활성화한다
     */
    활성화한다(): void {
        this.status = DocumentTemplateStatus.ACTIVE;
    }

    // /**
    //  * 초안으로 설정한다
    //  */
    // 초안으로설정한다(): void {
    //     this.status = DocumentTemplateStatus.DRAFT;
    // }

    // /**
    //  * 비활성화한다
    //  */
    // 비활성화한다(): void {
    //     this.status = DocumentTemplateStatus.INACTIVE;
    // }
}
