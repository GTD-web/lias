"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationCoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const reservation_controller_1 = require("@src/application/reservation/core/controllers/reservation.controller");
const admin_reservation_controller_1 = require("@src/application/reservation/core/controllers/admin.reservation.controller");
const cron_reservation_controller_1 = require("@src/application/reservation/core/controllers/cron.reservation.controller");
const reservation_module_1 = require("@src/domain/reservation/reservation.module");
const reservation_participant_module_1 = require("@src/domain/reservation-participant/reservation-participant.module");
const reservation_vehicle_module_1 = require("@src/domain/reservation-vehicle/reservation-vehicle.module");
const employee_module_1 = require("@src/domain/employee/employee.module");
const resource_module_1 = require("@src/domain/resource/resource.module");
const vehicle_info_module_1 = require("@src/domain/vehicle-info/vehicle-info.module");
const notification_module_1 = require("@src/application/notification/notification.module");
const schedule_1 = require("@nestjs/schedule");
const usecases_1 = require("./usecases");
const admin_reservation_service_1 = require("./services/admin-reservation.service");
const reservation_service_1 = require("./services/reservation.service");
const cron_reservation_service_1 = require("./services/cron-reservation.service");
const notification_module_2 = require("@src/domain/notification/notification.module");
const employee_notification_module_1 = require("@src/domain/employee-notification/employee-notification.module");
const file_module_1 = require("@src/domain/file/file.module");
let ReservationCoreModule = class ReservationCoreModule {
};
exports.ReservationCoreModule = ReservationCoreModule;
exports.ReservationCoreModule = ReservationCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Reservation,
                entities_1.ReservationParticipant,
                entities_1.ReservationVehicle,
                entities_1.Employee,
                entities_1.Resource,
                entities_1.VehicleInfo,
                entities_1.Notification,
            ]),
            reservation_module_1.DomainReservationModule,
            reservation_participant_module_1.DomainReservationParticipantModule,
            reservation_vehicle_module_1.DomainReservationVehicleModule,
            employee_module_1.DomainEmployeeModule,
            resource_module_1.DomainResourceModule,
            vehicle_info_module_1.DomainVehicleInfoModule,
            notification_module_1.NotificationModule,
            employee_notification_module_1.DomainEmployeeNotificationModule,
            notification_module_2.DomainNotificationModule,
            file_module_1.DomainFileModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [admin_reservation_controller_1.AdminReservationController, reservation_controller_1.UserReservationController, cron_reservation_controller_1.CronReservationController],
        providers: [
            admin_reservation_service_1.AdminReservationService,
            reservation_service_1.ReservationService,
            cron_reservation_service_1.CronReservationService,
            usecases_1.CheckReservationAccessUsecase,
            usecases_1.CreateReservationClosingJobUsecase,
            usecases_1.CreateReservationUsecase,
            usecases_1.DeleteReservationClosingJobUsecase,
            usecases_1.FindCheckReservationListUsecase,
            usecases_1.FindConflictReservationUsecase,
            usecases_1.FindMyAllSchedulesUsecase,
            usecases_1.FindMyReservationListUsecase,
            usecases_1.FindMyUpcomingReservationListUsecase,
            usecases_1.FindMyUsingReservationListUsecase,
            usecases_1.FindReservationDetailUsecase,
            usecases_1.FindReservationListUsecase,
            usecases_1.FindResourceReservationListUsecase,
            usecases_1.HandleCronUsecase,
            usecases_1.ReturnVehicleUsecase,
            usecases_1.UpdateReservationStatusUsecase,
            usecases_1.UpdateReservationUsecase,
            usecases_1.FindCalendarUsecase,
        ],
        exports: [
            admin_reservation_service_1.AdminReservationService,
            reservation_service_1.ReservationService,
            cron_reservation_service_1.CronReservationService,
            usecases_1.CheckReservationAccessUsecase,
            usecases_1.CreateReservationClosingJobUsecase,
            usecases_1.CreateReservationUsecase,
            usecases_1.DeleteReservationClosingJobUsecase,
            usecases_1.FindCheckReservationListUsecase,
            usecases_1.FindConflictReservationUsecase,
            usecases_1.FindMyAllSchedulesUsecase,
            usecases_1.FindMyReservationListUsecase,
            usecases_1.FindMyUpcomingReservationListUsecase,
            usecases_1.FindMyUsingReservationListUsecase,
            usecases_1.FindReservationDetailUsecase,
            usecases_1.FindReservationListUsecase,
            usecases_1.FindResourceReservationListUsecase,
            usecases_1.HandleCronUsecase,
            usecases_1.ReturnVehicleUsecase,
            usecases_1.UpdateReservationStatusUsecase,
            usecases_1.UpdateReservationUsecase,
            usecases_1.FindCalendarUsecase,
        ],
    })
], ReservationCoreModule);
//# sourceMappingURL=core.module.js.map