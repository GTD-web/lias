import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { VehicleInfoService } from '@src/application/resource/vehicle/services/vehicle-info.service';
export declare class AdminVehicleInfoController {
    private readonly vehicleInfoService;
    constructor(vehicleInfoService: VehicleInfoService);
    findVehicleInfo(vehicleInfoId: string): Promise<VehicleInfoResponseDto>;
    update(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto): Promise<VehicleInfoResponseDto>;
}
