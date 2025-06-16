import { DomainReservationRepository } from './reservation.repository';
import { BaseService } from '@libs/services/base.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainReservationService extends BaseService<Reservation> {
    private readonly reservationRepository;
    constructor(reservationRepository: DomainReservationRepository);
    count(repositoryOptions: IRepositoryOptions<Reservation>): Promise<number>;
}
