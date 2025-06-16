"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainReservationSnapshotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_snapshot_service_1 = require("./reservation-snapshot.service");
const reservation_snapshot_repository_1 = require("./reservation-snapshot.repository");
const reservation_snapshot_entity_1 = require("@libs/entities/reservation-snapshot.entity");
let DomainReservationSnapshotModule = class DomainReservationSnapshotModule {
};
exports.DomainReservationSnapshotModule = DomainReservationSnapshotModule;
exports.DomainReservationSnapshotModule = DomainReservationSnapshotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reservation_snapshot_entity_1.ReservationSnapshot])],
        providers: [reservation_snapshot_service_1.DomainReservationSnapshotService, reservation_snapshot_repository_1.DomainReservationSnapshotRepository],
        exports: [reservation_snapshot_service_1.DomainReservationSnapshotService],
    })
], DomainReservationSnapshotModule);
//# sourceMappingURL=reservation-snapshot.module.js.map