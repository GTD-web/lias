import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRevisionService } from './document-revision.service';
import { DocumentRevisionRepository } from './document-revision.repository';
import { DocumentRevision } from './document-revision.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentRevision])],
    providers: [DocumentRevisionService, DocumentRevisionRepository],
    exports: [DocumentRevisionService],
})
export class DomainDocumentRevisionModule {}

