import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { DocumentTemplate } from '../document-template/document-template.entity';

/**
 * Category 엔티티
 * 문서 템플릿과 문서의 카테고리를 관리합니다.
 * 1단계 깊이를 가지며, 비슷한 성격을 가진 양식들을 그룹화합니다.
 */
@Entity('categories')
@Index(['code'], { unique: true })
@Index(['order'])
export class Category {
    @PrimaryGeneratedColumn('uuid', { comment: '카테고리 ID' })
    id: string;

    @Column({ comment: '카테고리 이름' })
    name: string;

    @Column({ comment: '카테고리 코드', unique: true })
    code: string;

    @Column({ type: 'text', nullable: true, comment: '카테고리 설명' })
    description?: string;

    @Column({ type: 'int', default: 0, comment: '정렬 순서' })
    order: number;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @OneToMany(() => DocumentTemplate, (template) => template.category)
    documentTemplates: DocumentTemplate[];

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
     * 정렬 순서를 설정한다
     */
    정렬순서를설정한다(order: number): void {
        this.order = order;
    }
}
