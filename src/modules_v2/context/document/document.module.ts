import { Module } from '@nestjs/common';
import { DocumentContext } from './document.context';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainFormModule } from '../../domain/form/form.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainApprovalLineSnapshotModule } from '../../domain/approval-line-snapshot/approval-line-snapshot.module';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';

@Module({
    imports: [
        DomainDocumentModule,
        DomainFormModule,
        DomainEmployeeModule,
        DomainApprovalLineSnapshotModule,
        DomainApprovalStepSnapshotModule,
    ],
    providers: [DocumentContext],
    exports: [DocumentContext],
})
export class DocumentModule {}
