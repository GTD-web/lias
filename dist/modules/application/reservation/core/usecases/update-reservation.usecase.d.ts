import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { UpdateReservationDto } from '../dtos/update-reservation.dto';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { FindConflictReservationUsecase } from './find-conflict-reservation.usecase';
import { CreateReservationClosingJobUsecase } from './create-reservation-closing-job.usecase';
import { DeleteReservationClosingJobUsecase } from './delete-reservation-closing-job.usecase';
export declare class UpdateReservationUsecase {
    private readonly reservationService;
    private readonly participantService;
    private readonly notificationService;
    private readonly findConflictReservationUsecase;
    private readonly createReservationClosingJob;
    private readonly deleteReservationClosingJob;
    constructor(reservationService: DomainReservationService, participantService: DomainReservationParticipantService, notificationService: NotificationService, findConflictReservationUsecase: FindConflictReservationUsecase, createReservationClosingJob: CreateReservationClosingJobUsecase, deleteReservationClosingJob: DeleteReservationClosingJobUsecase);
    execute(reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto>;
}
