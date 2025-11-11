import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainDocumentTemplateService } from './document-template.service';
import { DomainDocumentTemplateRepository } from './document-template.repository';
import { DocumentTemplate } from './document-template.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentTemplate])],
    providers: [DomainDocumentTemplateService, DomainDocumentTemplateRepository],
    exports: [DomainDocumentTemplateService],
})
export class DomainDocumentTemplateModule {}
