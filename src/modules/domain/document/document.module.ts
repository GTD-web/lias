import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../../../database/entities';
import { DomainDocumentService } from './document.service';
import { DomainDocumentRepository } from './document.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    providers: [DomainDocumentService, DomainDocumentRepository],
    exports: [DomainDocumentService],
})
export class DocumentModule {}
