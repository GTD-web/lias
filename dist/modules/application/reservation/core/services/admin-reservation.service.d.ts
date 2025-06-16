import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { FindReservationListUsecase } from '../usecases/find-reservation-list.usecase';
import { FindCheckReservationListUsecase } from '../usecases/find-check-reservation-list.usecase';
import { FindReservationDetailUsecase } from '../usecases/find-reservation-detail.usecase';
import { UpdateReservationStatusUsecase } from '../usecases/update-reservation-status.usecase';
export declare class AdminReservationService {
    private readonly findReservationListUsecase;
    private readonly findCheckReservationListUsecase;
    private readonly findReservationDetailUsecase;
    private readonly updateReservationStatusUsecase;
    constructor(findReservationListUsecase: FindReservationListUsecase, findCheckReservationListUsecase: FindCheckReservationListUsecase, findReservationDetailUsecase: FindReservationDetailUsecase, updateReservationStatusUsecase: UpdateReservationStatusUsecase);
    findReservationList(startDate?: string, endDate?: string, resourceType?: ResourceType, resourceId?: string, status?: string[]): Promise<ReservationWithRelationsResponseDto[]>;
    findCheckReservationList(query: PaginationQueryDto): Promise<PaginationData<ReservationWithRelationsResponseDto>>;
    findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto>;
    updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto>;
}
