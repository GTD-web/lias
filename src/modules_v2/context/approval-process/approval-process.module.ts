import { Module } from '@nestjs/common';
import { ApprovalProcessContext } from './approval-process.context';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';
import { DomainApprovalLineSnapshotModule } from '../../domain/approval-line-snapshot/approval-line-snapshot.module';
import { DomainDocumentModule } from '../../domain/document/document.module';

@Module({
    imports: [DomainApprovalStepSnapshotModule, DomainApprovalLineSnapshotModule, DomainDocumentModule],
    providers: [ApprovalProcessContext],
    exports: [ApprovalProcessContext],
})
export class ApprovalProcessModule {}
