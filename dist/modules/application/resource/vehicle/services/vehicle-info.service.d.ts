import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { FindVehicleInfoUsecase } from '../usecases/vehicle-info/findVehicleInfo.usecase';
import { UpdateVehicleInfoUsecase } from '../usecases/vehicle-info/updateVehicleInfo.usecase';
export declare class VehicleInfoService {
    private readonly findVehicleInfoUsecase;
    private readonly updateVehicleInfoUsecase;
    constructor(findVehicleInfoUsecase: FindVehicleInfoUsecase, updateVehicleInfoUsecase: UpdateVehicleInfoUsecase);
    findVehicleInfo(vehicleInfoId: string): Promise<VehicleInfoResponseDto>;
    updateVehicleInfo(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto): Promise<VehicleInfoResponseDto>;
}
