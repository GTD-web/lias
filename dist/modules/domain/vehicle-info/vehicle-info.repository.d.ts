import { Repository } from 'typeorm';
import { VehicleInfo } from '@libs/entities/vehicle-info.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainVehicleInfoRepository extends BaseRepository<VehicleInfo> {
    constructor(repository: Repository<VehicleInfo>);
}
