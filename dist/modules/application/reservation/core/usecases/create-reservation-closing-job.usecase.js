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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationClosingJobUsecase = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const date_util_1 = require("@libs/utils/date.util");
const delete_reservation_closing_job_usecase_1 = require("./delete-reservation-closing-job.usecase");
let CreateReservationClosingJobUsecase = class CreateReservationClosingJobUsecase {
    constructor(schedulerRegistry, reservationService, deleteReservationClosingJob) {
        this.schedulerRegistry = schedulerRegistry;
        this.reservationService = reservationService;
        this.deleteReservationClosingJob = deleteReservationClosingJob;
    }
    async execute(reservation) {
        const jobName = `closing-${reservation.reservationId}`;
        console.log('createReservationClosingJob', jobName);
        const executeTime = date_util_1.DateUtil.date(reservation.endDate).toDate();
        if (executeTime.getTime() <= Date.now()) {
            console.log(`ExecuteTime time ${executeTime} is in the past, skipping cron job creation`);
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
            return;
        }
        this.deleteReservationClosingJob.execute(reservation.reservationId);
        const job = new cron_1.CronJob(executeTime, async () => {
            await this.reservationService.update(reservation.reservationId, { status: reservation_type_enum_1.ReservationStatus.CLOSED });
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
    }
};
exports.CreateReservationClosingJobUsecase = CreateReservationClosingJobUsecase;
exports.CreateReservationClosingJobUsecase = CreateReservationClosingJobUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _b : Object, delete_reservation_closing_job_usecase_1.DeleteReservationClosingJobUsecase])
], CreateReservationClosingJobUsecase);
//# sourceMappingURL=create-reservation-closing-job.usecase.js.map