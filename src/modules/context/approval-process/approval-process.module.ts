import { Module } from '@nestjs/common';
import { ApprovalProcessContext } from './approval-process.context';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';
import { DomainDocumentModule } from '../../domain/document/document.module';

@Module({
    imports: [DomainApprovalStepSnapshotModule, DomainDocumentModule],
    providers: [ApprovalProcessContext],
    exports: [ApprovalProcessContext],
})
export class ApprovalProcessModule {}
