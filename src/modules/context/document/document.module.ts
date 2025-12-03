import { Module } from '@nestjs/common';
import { DocumentContext } from './document.context';
import { DocumentQueryService } from './document-query.service';
import { DocumentFilterBuilder } from './document-filter.builder';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainDocumentTemplateModule } from '../../domain/document-template/document-template.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';

@Module({
    imports: [
        DomainDocumentModule,
        DomainDocumentTemplateModule,
        DomainEmployeeModule,
        DomainApprovalStepSnapshotModule,
    ],
    providers: [DocumentContext, DocumentQueryService, DocumentFilterBuilder],
    exports: [DocumentContext, DocumentQueryService],
})
export class DocumentModule {}
