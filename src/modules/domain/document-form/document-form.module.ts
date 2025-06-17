import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentForm } from '../../../database/entities';
import { DomainDocumentFormService } from './document-form.service';
import { DomainDocumentFormRepository } from './document-form.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentForm])],
    providers: [DomainDocumentFormService, DomainDocumentFormRepository],
    exports: [DomainDocumentFormService],
})
export class DocumentFormModule {}
