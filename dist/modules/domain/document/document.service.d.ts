import { DomainDocumentRepository } from './document.repository';
import { BaseService } from '../../../common/services/base.service';
import { Document } from '../../../database/entities';
import { QueryRunner } from 'typeorm';
export declare class DomainDocumentService extends BaseService<Document> {
    private readonly documentRepository;
    constructor(documentRepository: DomainDocumentRepository);
    approve(id: string, queryRunner?: QueryRunner): Promise<Document>;
    reject(id: string, queryRunner?: QueryRunner): Promise<Document>;
}
