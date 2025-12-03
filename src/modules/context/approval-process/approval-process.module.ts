import { Module } from '@nestjs/common';
import { ApprovalProcessContext } from './approval-process.context';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainCommentModule } from '../../domain/comment/comment.module';

@Module({
    imports: [DomainApprovalStepSnapshotModule, DomainDocumentModule, DomainCommentModule],
    providers: [ApprovalProcessContext],
    exports: [ApprovalProcessContext],
})
export class ApprovalProcessModule {}
