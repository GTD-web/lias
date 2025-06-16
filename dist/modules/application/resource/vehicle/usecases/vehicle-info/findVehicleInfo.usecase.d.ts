import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { VehicleInfoResponseDto } from '../../dtos/vehicle-response.dto';
export declare class FindVehicleInfoUsecase {
    private readonly vehicleInfoService;
    constructor(vehicleInfoService: DomainVehicleInfoService);
    execute(vehicleInfoId: string): Promise<VehicleInfoResponseDto>;
}
