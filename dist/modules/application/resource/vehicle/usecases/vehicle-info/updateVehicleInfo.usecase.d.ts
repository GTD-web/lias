import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { UpdateVehicleInfoDto } from '../../dtos/update-vehicle-info.dto';
import { DomainFileService } from '@src/domain/file/file.service';
import { DataSource } from 'typeorm';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
export declare class UpdateVehicleInfoUsecase {
    private readonly vehicleInfoService;
    private readonly consumableService;
    private readonly fileService;
    private readonly dataSource;
    constructor(vehicleInfoService: DomainVehicleInfoService, consumableService: DomainConsumableService, fileService: DomainFileService, dataSource: DataSource);
    execute(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto): Promise<{
        vehicleInfoId: any;
        resourceId: any;
        totalMileage: number;
        leftMileage: number;
        insuranceName: any;
        insuranceNumber: any;
        parkingLocationImages: any;
        odometerImages: any;
        indoorImages: any;
    }>;
}
