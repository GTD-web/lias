import { DomainApprovalLineSnapshotRepository } from './approval-line-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineSnapshot } from './approval-line-snapshot.entity';
export declare class DomainApprovalLineSnapshotService extends BaseService<ApprovalLineSnapshot> {
    private readonly approvalLineSnapshotRepository;
    constructor(approvalLineSnapshotRepository: DomainApprovalLineSnapshotRepository);
    findBySnapshotId(id: string): Promise<ApprovalLineSnapshot>;
    findByDocumentId(documentId: string): Promise<ApprovalLineSnapshot>;
    findBySourceTemplateVersionId(sourceTemplateVersionId: string): Promise<ApprovalLineSnapshot[]>;
}
