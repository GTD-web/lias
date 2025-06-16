import { DomainAccommodationInfoRepository } from './accommodation-info.repository';
import { BaseService } from '@libs/services/base.service';
import { AccommodationInfo } from '@libs/entities/accommodation-info.entity';
export declare class DomainAccommodationInfoService extends BaseService<AccommodationInfo> {
    private readonly accommodationInfoRepository;
    constructor(accommodationInfoRepository: DomainAccommodationInfoRepository);
    findByAccommodationInfoId(accommodationInfoId: string): Promise<AccommodationInfo>;
    findByResourceId(resourceId: string): Promise<AccommodationInfo>;
}
