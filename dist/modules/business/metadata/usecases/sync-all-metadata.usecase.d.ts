import { MetadataSyncContext } from '../../../context/metadata-sync/metadata-sync.context';
import { SyncMetadataResponseDto } from '../dtos';
import { ExternalMetadataService } from '../services/external-metadata.service';
export declare class SyncAllMetadataUsecase {
    private readonly metadataSyncContext;
    private readonly externalMetadataService;
    private readonly logger;
    constructor(metadataSyncContext: MetadataSyncContext, externalMetadataService: ExternalMetadataService);
    execute(): Promise<SyncMetadataResponseDto>;
}
