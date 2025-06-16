import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@resource/domain/maintenance/maintenance.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DataSource } from 'typeorm';
export declare class DeleteMaintenanceUsecase {
    private readonly maintenanceService;
    private readonly fileService;
    private readonly dataSource;
    constructor(maintenanceService: DomainMaintenanceService, fileService: DomainFileService, dataSource: DataSource);
    execute(user: Employee, maintenanceId: string): Promise<void>;
}
