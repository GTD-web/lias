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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronReservationController = void 0;
const public_decorator_1 = require("@libs/decorators/public.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cron_reservation_service_1 = require("../services/cron-reservation.service");
let CronReservationController = class CronReservationController {
    constructor(cronReservationService) {
        this.cronReservationService = cronReservationService;
    }
    async closeReservation() {
        return this.cronReservationService.closeReservation();
    }
};
exports.CronReservationController = CronReservationController;
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('cron-job/close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronReservationController.prototype, "closeReservation", null);
exports.CronReservationController = CronReservationController = __decorate([
    (0, swagger_1.ApiTags)('2. 예약 '),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('v1/reservations'),
    __metadata("design:paramtypes", [cron_reservation_service_1.CronReservationService])
], CronReservationController);
//# sourceMappingURL=cron.reservation.controller.js.map