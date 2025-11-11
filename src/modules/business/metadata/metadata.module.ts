import { Module } from '@nestjs/common';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataQueryController } from './controllers/metadata-query.controller';
import { SyncAllMetadataUsecase } from './usecases/sync-all-metadata.usecase';
import { ExternalMetadataService } from './services/external-metadata.service';
import { MetadataSyncModule } from '../../context/metadata-sync/metadata-sync.module';
import { MetadataContextModule } from '../../context/metadata/metadata-context.module';

@Module({
    imports: [
        MetadataSyncModule, // Sync용 컨텍스트
        MetadataContextModule, // 조회용 컨텍스트
    ],
    controllers: [
        MetadataController, // POST /metadata/sync
        MetadataQueryController, // GET /metadata/*
    ],
    providers: [SyncAllMetadataUsecase, ExternalMetadataService],
})
export class MetadataModule {}
