import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from '../../../database/entities';
import { DomainDocumentTypeService } from './document-type.service';
import { DomainDocumentTypeRepository } from './document-type.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentType])],
    providers: [DomainDocumentTypeService, DomainDocumentTypeRepository],
    exports: [DomainDocumentTypeService],
})
export class DomainDocumentTypeModule {}
