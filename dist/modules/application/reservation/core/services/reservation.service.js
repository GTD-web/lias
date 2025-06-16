"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const create_reservation_usecase_1 = require("../usecases/create-reservation.usecase");
const find_my_reservation_list_usecase_1 = require("../usecases/find-my-reservation-list.usecase");
const find_resource_reservation_list_usecase_1 = require("../usecases/find-resource-reservation-list.usecase");
const find_my_using_reservation_list_usecase_1 = require("../usecases/find-my-using-reservation-list.usecase");
const find_my_upcoming_reservation_list_usecase_1 = require("../usecases/find-my-upcoming-reservation-list.usecase");
const find_my_all_schedules_usecase_1 = require("../usecases/find-my-all-schedules.usecase");
const find_reservation_detail_usecase_1 = require("../usecases/find-reservation-detail.usecase");
const update_reservation_usecase_1 = require("../usecases/update-reservation.usecase");
const update_reservation_status_usecase_1 = require("../usecases/update-reservation-status.usecase");
const return_vehicle_usecase_1 = require("../usecases/return-vehicle.usecase");
const check_reservation_access_usecase_1 = require("../usecases/check-reservation-access.usecase");
const find_calendar_usecase_1 = require("../usecases/find-calendar.usecase");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const create_reservation_closing_job_usecase_1 = require("../usecases/create-reservation-closing-job.usecase");
let ReservationService = class ReservationService {
    constructor(createReservationUsecase, findMyReservationListUsecase, findResourceReservationListUsecase, findMyUsingReservationListUsecase, findMyUpcomingReservationListUsecase, findMyAllSchedulesUsecase, findReservationDetailUsecase, updateReservationUsecase, updateReservationStatusUsecase, returnVehicleUsecase, checkReservationAccessUsecase, findCalendarUsecase, reservationService, createReservationClosingJob) {
        this.createReservationUsecase = createReservationUsecase;
        this.findMyReservationListUsecase = findMyReservationListUsecase;
        this.findResourceReservationListUsecase = findResourceReservationListUsecase;
        this.findMyUsingReservationListUsecase = findMyUsingReservationListUsecase;
        this.findMyUpcomingReservationListUsecase = findMyUpcomingReservationListUsecase;
        this.findMyAllSchedulesUsecase = findMyAllSchedulesUsecase;
        this.findReservationDetailUsecase = findReservationDetailUsecase;
        this.updateReservationUsecase = updateReservationUsecase;
        this.updateReservationStatusUsecase = updateReservationStatusUsecase;
        this.returnVehicleUsecase = returnVehicleUsecase;
        this.checkReservationAccessUsecase = checkReservationAccessUsecase;
        this.findCalendarUsecase = findCalendarUsecase;
        this.reservationService = reservationService;
        this.createReservationClosingJob = createReservationClosingJob;
    }
    async onModuleInit() {
    }
    async create(user, createDto) {
        return this.createReservationUsecase.execute(user, createDto);
    }
    async findMyReservationList(employeeId, page, limit, resourceType, startDate, endDate) {
        return this.findMyReservationListUsecase.execute(employeeId, page, limit, resourceType, startDate, endDate);
    }
    async findResourceReservationList(employeeId, resourceId, page, limit, month, isMine) {
        return this.findResourceReservationListUsecase.execute(employeeId, resourceId, page, limit, month, isMine);
    }
    async findMyUsingReservationList(employeeId) {
        return this.findMyUsingReservationListUsecase.execute(employeeId);
    }
    async findMyUpcomingReservationList(employeeId, query, resourceType) {
        return this.findMyUpcomingReservationListUsecase.execute(employeeId, query, resourceType);
    }
    async findMyAllSchedules(employeeId, query, resourceType) {
        return this.findMyAllSchedulesUsecase.execute(employeeId, query, resourceType);
    }
    async findCalendar(user, startDate, endDate, resourceType, isMine) {
        return this.findCalendarUsecase.execute(user, startDate, endDate, resourceType, isMine);
    }
    async findReservationDetail(user, reservationId) {
        return this.findReservationDetailUsecase.execute(user, reservationId);
    }
    async updateReservation(reservationId, updateDto) {
        return this.updateReservationUsecase.execute(reservationId, updateDto);
    }
    async updateStatusCancel(reservationId) {
        return this.updateReservationStatusUsecase.execute(reservationId, { status: reservation_type_enum_1.ReservationStatus.CANCELLED });
    }
    async returnVehicle(user, reservationId, returnDto) {
        return this.returnVehicleUsecase.execute(user, reservationId, returnDto);
    }
    async checkReservationAccess(reservationId, employeeId) {
        await this.checkReservationAccessUsecase.execute(reservationId, employeeId);
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_reservation_usecase_1.CreateReservationUsecase,
        find_my_reservation_list_usecase_1.FindMyReservationListUsecase,
        find_resource_reservation_list_usecase_1.FindResourceReservationListUsecase,
        find_my_using_reservation_list_usecase_1.FindMyUsingReservationListUsecase,
        find_my_upcoming_reservation_list_usecase_1.FindMyUpcomingReservationListUsecase,
        find_my_all_schedules_usecase_1.FindMyAllSchedulesUsecase,
        find_reservation_detail_usecase_1.FindReservationDetailUsecase,
        update_reservation_usecase_1.UpdateReservationUsecase,
        update_reservation_status_usecase_1.UpdateReservationStatusUsecase,
        return_vehicle_usecase_1.ReturnVehicleUsecase,
        check_reservation_access_usecase_1.CheckReservationAccessUsecase,
        find_calendar_usecase_1.FindCalendarUsecase, typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, create_reservation_closing_job_usecase_1.CreateReservationClosingJobUsecase])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map