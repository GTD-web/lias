import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { DataSource } from 'typeorm';
import { Employee } from '@libs/entities';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class ReturnVehicleUsecase {
    private readonly reservationService;
    private readonly reservationVehicleService;
    private readonly resourceService;
    private readonly vehicleInfoService;
    private readonly notificationService;
    private readonly fileService;
    private readonly dataSource;
    constructor(reservationService: DomainReservationService, reservationVehicleService: DomainReservationVehicleService, resourceService: DomainResourceService, vehicleInfoService: DomainVehicleInfoService, notificationService: NotificationService, fileService: DomainFileService, dataSource: DataSource);
    execute(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean>;
}
