import { ReservationResponseDto, UpdateReservationStatusDto } from '@resource/dtos.index';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { AdminReservationService } from '../services/admin-reservation.service';
export declare class AdminReservationController {
    private readonly adminReservationService;
    constructor(adminReservationService: AdminReservationService);
    findReservationList(startDate?: string, endDate?: string, resourceType?: ResourceType, resourceId?: string, status?: string[]): Promise<ReservationWithRelationsResponseDto[]>;
    findCheckReservationList(query: PaginationQueryDto): Promise<PaginationData<ReservationWithRelationsResponseDto>>;
    findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto>;
    updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto>;
}
