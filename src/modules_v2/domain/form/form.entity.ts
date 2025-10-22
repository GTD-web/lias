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
import { FormStatus } from '../../../common/enums/approval.enum';

/**
 * Form 엔티티
 * 문서 양식의 메타데이터를 관리하며, 버전 관리를 통해 변경 이력을 추적합니다.
 */
@Entity('forms')
@Index(['status'])
export class Form {
    @PrimaryGeneratedColumn('uuid', { comment: '문서 양식 ID' })
    id: string;

    @Column({ comment: '문서 양식 이름' })
    name: string;

    @Column({ unique: true, comment: '문서 양식 코드' })
    code: string;

    @Column({ type: 'text', nullable: true, comment: '문서 양식 설명' })
    description?: string;

    @Column({
        type: 'enum',
        enum: FormStatus,
        default: FormStatus.DRAFT,
        comment: '문서 양식 상태',
    })
    status: FormStatus;

    @Column({ type: 'uuid', nullable: true, comment: '현재 활성 버전 ID' })
    currentVersionId?: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // Relations
    @ManyToOne('FormVersion')
    @JoinColumn({ name: 'currentVersionId' })
    currentVersion?: any;

    @OneToMany('FormVersion', 'form')
    versions: any[];
}
