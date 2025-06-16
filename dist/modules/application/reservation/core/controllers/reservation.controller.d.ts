import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationWithRelationsResponseDto, GroupedReservationResponseDto, GroupedReservationWithResourceResponseDto, CreateReservationResponseDto, CalendarResponseDto } from '../dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { UpdateReservationDto, ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
export declare class UserReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto>;
    findMyReservationList(user: Employee, resourceType?: ResourceType, startDate?: string, endDate?: string, query?: PaginationQueryDto): Promise<PaginationData<GroupedReservationResponseDto>>;
    findResourceReservationList(user: Employee, resourceId: string, query?: PaginationQueryDto, month?: string, isMine?: boolean): Promise<GroupedReservationWithResourceResponseDto>;
    findMyUsingReservationList(user: Employee): Promise<PaginationData<ReservationWithRelationsResponseDto>>;
    findMyUpcomingReservationList(user: Employee, resourceType?: ResourceType, query?: PaginationQueryDto): Promise<PaginationData<GroupedReservationResponseDto>>;
    findMyUpcomingSchedules(user: Employee, resourceType?: ResourceType, query?: PaginationQueryDto): Promise<PaginationData<GroupedReservationResponseDto>>;
    findCalendar(user: Employee, startDate: string, endDate: string, resourceType?: ResourceType, isMine?: boolean): Promise<CalendarResponseDto>;
    findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto>;
    updateReservation(user: Employee, reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto>;
    updateStatusCancel(user: Employee, reservationId: string): Promise<ReservationResponseDto>;
    returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean>;
}
