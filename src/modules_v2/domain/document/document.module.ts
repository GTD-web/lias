import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainDocumentService } from './document.service';
import { DomainDocumentRepository } from './document.repository';
import { Document } from './document.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    providers: [DomainDocumentService, DomainDocumentRepository],
    exports: [DomainDocumentService],
})
export class DomainDocumentModule {}
