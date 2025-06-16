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
exports.AdminReservationService = void 0;
const common_1 = require("@nestjs/common");
const find_reservation_list_usecase_1 = require("../usecases/find-reservation-list.usecase");
const find_check_reservation_list_usecase_1 = require("../usecases/find-check-reservation-list.usecase");
const find_reservation_detail_usecase_1 = require("../usecases/find-reservation-detail.usecase");
const update_reservation_status_usecase_1 = require("../usecases/update-reservation-status.usecase");
let AdminReservationService = class AdminReservationService {
    constructor(findReservationListUsecase, findCheckReservationListUsecase, findReservationDetailUsecase, updateReservationStatusUsecase) {
        this.findReservationListUsecase = findReservationListUsecase;
        this.findCheckReservationListUsecase = findCheckReservationListUsecase;
        this.findReservationDetailUsecase = findReservationDetailUsecase;
        this.updateReservationStatusUsecase = updateReservationStatusUsecase;
    }
    async findReservationList(startDate, endDate, resourceType, resourceId, status) {
        return this.findReservationListUsecase.execute(startDate, endDate, resourceType, resourceId, status);
    }
    async findCheckReservationList(query) {
        return this.findCheckReservationListUsecase.execute(query);
    }
    async findOne(user, reservationId) {
        return this.findReservationDetailUsecase.execute(user, reservationId);
    }
    async updateStatus(reservationId, updateDto) {
        return this.updateReservationStatusUsecase.execute(reservationId, updateDto);
    }
};
exports.AdminReservationService = AdminReservationService;
exports.AdminReservationService = AdminReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [find_reservation_list_usecase_1.FindReservationListUsecase,
        find_check_reservation_list_usecase_1.FindCheckReservationListUsecase,
        find_reservation_detail_usecase_1.FindReservationDetailUsecase,
        update_reservation_status_usecase_1.UpdateReservationStatusUsecase])
], AdminReservationService);
//# sourceMappingURL=admin-reservation.service.js.map