import { MetadataService } from '../metadata.service';
export declare class MetadataWebhookController {
    private readonly metadataService;
    constructor(metadataService: MetadataService);
    syncMetadata(): Promise<{
        message: string;
    }>;
}
