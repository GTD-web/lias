import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { CreateReservationResponseDto } from '../dtos/reservation-response.dto';
import { DataSource } from 'typeorm';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { Employee } from '@libs/entities';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { FindConflictReservationUsecase } from './find-conflict-reservation.usecase';
import { CreateReservationClosingJobUsecase } from './create-reservation-closing-job.usecase';
export declare class CreateReservationUsecase {
    private readonly reservationService;
    private readonly participantService;
    private readonly reservationVehicleService;
    private readonly resourceService;
    private readonly employeeService;
    private readonly notificationService;
    private readonly dataSource;
    private readonly findConflictReservationUsecase;
    private readonly createReservationClosingJob;
    constructor(reservationService: DomainReservationService, participantService: DomainReservationParticipantService, reservationVehicleService: DomainReservationVehicleService, resourceService: DomainResourceService, employeeService: DomainEmployeeService, notificationService: NotificationService, dataSource: DataSource, findConflictReservationUsecase: FindConflictReservationUsecase, createReservationClosingJob: CreateReservationClosingJobUsecase);
    execute(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto>;
}
