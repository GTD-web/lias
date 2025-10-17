import { MetadataService } from '../metadata.service';
export declare class MetadataWebhookController {
    private readonly metadataService;
    constructor(metadataService: MetadataService);
    syncAllMetadata(): Promise<{
        ok: boolean;
        message: string;
        acceptedAt: string;
    }>;
}
