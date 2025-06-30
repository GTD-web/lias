import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Document } from './document.entity';

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    fileId: string;

    @Column({ comment: '파일 이름' })
    fileName: string;

    @Column({ unique: true, comment: '파일 경로' })
    filePath: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @Column({ nullable: true })
    documentId: string;

    @ManyToOne(() => Document, (document) => document.files)
    @JoinColumn({ name: 'documentId' })
    document: Document;
}
