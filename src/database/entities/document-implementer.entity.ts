import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Document } from './document.entity';

@Entity('document_implementers')
export class DocumentImplementer {
    @PrimaryGeneratedColumn('uuid')
    documentImplementerId: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ comment: '직급' })
    rank: string;

    @Column({
        comment: '정렬 순서',
    })
    order: number;

    @Column({ nullable: true, comment: '시행 일자' })
    implementDate: Date;

    @Column({ nullable: true, comment: '시행자' })
    implementerId: string;

    @ManyToOne(() => Employee, (employee) => employee.implementDocuments)
    @JoinColumn({ name: 'implementerId' })
    implementer: Employee;

    @Column({ nullable: true, comment: '문서 ID' })
    documentId: string;

    @ManyToOne(() => Document, (document) => document.implementers)
    @JoinColumn({ name: 'documentId' })
    document: Document;
}
