import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '../dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { SaveMaintenanceUsecase } from '../usecases/maintenance/saveMaintenance.usecase';
import { UpdateMaintenanceUsecase } from '../usecases/maintenance/updateMaintenance.usecase';
import { DeleteMaintenanceUsecase } from '../usecases/maintenance/deleteMaintenance.usecase';
import { FindAllMaintenancesByVehicleInfoIdUsecase } from '../usecases/maintenance/findAllMaintenancesByVehicleInfoId.usecase';
import { FindOneMaintenanceUsecase } from '../usecases/maintenance/findOneMaintenance.usecase';
export declare class MaintenanceService {
    private readonly saveMaintenanceUsecase;
    private readonly updateMaintenanceUsecase;
    private readonly deleteMaintenanceUsecase;
    private readonly findAllMaintenancesByVehicleInfoIdUsecase;
    private readonly findOneMaintenanceUsecase;
    constructor(saveMaintenanceUsecase: SaveMaintenanceUsecase, updateMaintenanceUsecase: UpdateMaintenanceUsecase, deleteMaintenanceUsecase: DeleteMaintenanceUsecase, findAllMaintenancesByVehicleInfoIdUsecase: FindAllMaintenancesByVehicleInfoIdUsecase, findOneMaintenanceUsecase: FindOneMaintenanceUsecase);
    save(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto>;
    findAllByVehicleInfoId(user: Employee, vehicleInfoId: string, page: number, limit: number): Promise<PaginationData<MaintenanceResponseDto>>;
    findOne(user: Employee, maintenanceId: string): Promise<MaintenanceResponseDto>;
    update(user: Employee, maintenanceId: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<MaintenanceResponseDto>;
    delete(user: Employee, maintenanceId: string): Promise<void>;
}
