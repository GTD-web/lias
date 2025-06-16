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
exports.DomainReservationSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const reservation_snapshot_repository_1 = require("./reservation-snapshot.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainReservationSnapshotService = class DomainReservationSnapshotService extends base_service_1.BaseService {
    constructor(reservationSnapshotRepository) {
        super(reservationSnapshotRepository);
        this.reservationSnapshotRepository = reservationSnapshotRepository;
    }
};
exports.DomainReservationSnapshotService = DomainReservationSnapshotService;
exports.DomainReservationSnapshotService = DomainReservationSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservation_snapshot_repository_1.DomainReservationSnapshotRepository])
], DomainReservationSnapshotService);
//# sourceMappingURL=reservation-snapshot.service.js.map