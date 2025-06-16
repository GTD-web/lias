import { Repository } from 'typeorm';
import { AccommodationInfo } from '@libs/entities/accommodation-info.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainAccommodationInfoRepository extends BaseRepository<AccommodationInfo> {
    constructor(repository: Repository<AccommodationInfo>);
}
