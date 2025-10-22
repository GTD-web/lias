import { Repository } from 'typeorm';
import { ApprovalLineSnapshot } from './approval-line-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainApprovalLineSnapshotRepository extends BaseRepository<ApprovalLineSnapshot> {
    constructor(repository: Repository<ApprovalLineSnapshot>);
    findByDocumentId(documentId: string): Promise<ApprovalLineSnapshot | null>;
    findBySourceTemplateVersionId(sourceTemplateVersionId: string): Promise<ApprovalLineSnapshot[]>;
}
