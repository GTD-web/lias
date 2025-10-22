import { Module } from '@nestjs/common';
import { DocumentContext } from './document.context';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainFormModule } from '../../domain/form/form.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';

@Module({
    imports: [DomainDocumentModule, DomainFormModule, DomainEmployeeModule],
    providers: [DocumentContext],
    exports: [DocumentContext],
})
export class DocumentModule {}
