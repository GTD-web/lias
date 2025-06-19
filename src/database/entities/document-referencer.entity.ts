import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Document } from './document.entity';

@Entity('document-referencers')
export class DocumentReferencer {
    @PrimaryGeneratedColumn('uuid')
    documentReferencerId: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ comment: '직급' })
    rank: string;

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
