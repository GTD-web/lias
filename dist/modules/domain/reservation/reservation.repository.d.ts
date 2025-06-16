import { Repository } from 'typeorm';
import { Reservation } from '@libs/entities/reservation.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainReservationRepository extends BaseRepository<Reservation> {
    constructor(repository: Repository<Reservation>);
    count(repositoryOptions: IRepositoryOptions<Reservation>): Promise<number>;
}
