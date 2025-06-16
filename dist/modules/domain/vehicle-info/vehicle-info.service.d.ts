import { DomainVehicleInfoRepository } from './vehicle-info.repository';
import { BaseService } from '@libs/services/base.service';
import { VehicleInfo } from '@libs/entities/vehicle-info.entity';
export declare class DomainVehicleInfoService extends BaseService<VehicleInfo> {
    private readonly vehicleInfoRepository;
    constructor(vehicleInfoRepository: DomainVehicleInfoRepository);
    findByVehicleInfoId(vehicleInfoId: string): Promise<VehicleInfo>;
    findByResourceId(resourceId: string): Promise<VehicleInfo>;
}
