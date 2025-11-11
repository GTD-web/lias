import { SyncAllMetadataUsecase } from '../usecases/sync-all-metadata.usecase';
import { SyncMetadataResponseDto } from '../dtos';
export declare class MetadataController {
    private readonly syncAllMetadataUsecase;
    constructor(syncAllMetadataUsecase: SyncAllMetadataUsecase);
    syncMetadata(): Promise<SyncMetadataResponseDto>;
}
