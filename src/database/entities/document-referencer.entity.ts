import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Document } from './document.entity';

@Entity('document_referencers')
export class DocumentReferencer {
    @PrimaryGeneratedColumn('uuid')
    documentReferencerId: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ comment: '직급' })
    rank: string;

    @Column({
        comment: '정렬 순서',
    })
    order: number;

    @Column({ nullable: true, comment: '참조자' })
    referencerId: string;

    @ManyToOne(() => Employee, (employee) => employee.referencedDocuments)
    @JoinColumn({ name: 'referencerId' })
    referencer: Employee;

    @Column({ nullable: true, comment: '문서 ID' })
    documentId: string;

    @ManyToOne(() => Document, (document) => document.referencers)
    @JoinColumn({ name: 'documentId' })
    document: Document;
}
