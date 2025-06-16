import { DomainResourceService } from '@src/domain/resource/resource.service';
import { UpdateResourceOrdersDto } from '../../dtos/update-resource.dto';
import { DataSource } from 'typeorm';
export declare class ReorderResourcesUsecase {
    private readonly resourceService;
    private readonly dataSource;
    constructor(resourceService: DomainResourceService, dataSource: DataSource);
    execute(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void>;
}
