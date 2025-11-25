import { Module } from '@nestjs/common';
import { DocumentContext } from './document.context';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';

@Module({
    // imports: [DomainDocumentModule, DomainDocumentTemplateModule, DomainEmployeeModule],
    imports: [DomainApprovalStepSnapshotModule],
    providers: [DocumentContext],
    exports: [DocumentContext],
})
export class DocumentModule {}
