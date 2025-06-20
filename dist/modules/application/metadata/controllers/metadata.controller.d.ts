import { MetadataService } from '../metadata.service';
import { MetadataResponseDto } from '../dtos/metadata-response.dto';
export declare class MetadataController {
    private readonly metadataService;
    constructor(metadataService: MetadataService);
    findAllEmplyeesByDepartment(): Promise<MetadataResponseDto>;
}
