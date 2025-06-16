"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationSnapshotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const snapshot_service_1 = require("./snapshot.service");
const snapshot_controller_1 = require("./controllers/snapshot.controller");
const reservation_snapshot_module_1 = require("@src/domain/reservation-snapshot/reservation-snapshot.module");
const usecases_1 = require("./usecases");
let ReservationSnapshotModule = class ReservationSnapshotModule {
};
exports.ReservationSnapshotModule = ReservationSnapshotModule;
exports.ReservationSnapshotModule = ReservationSnapshotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.ReservationSnapshot]), reservation_snapshot_module_1.DomainReservationSnapshotModule],
        controllers: [snapshot_controller_1.UserReservationSnapshotController],
        providers: [
            snapshot_service_1.SnapshotService,
            usecases_1.FindSnapshotUsecase,
            usecases_1.UpsertSnapshotUsecase,
            usecases_1.ConvertSnapshotUsecase,
            usecases_1.CreateSnapshotUsecase,
            usecases_1.DeleteSnapshotUsecase,
            usecases_1.UpdateSnapshotUsecase,
        ],
        exports: [],
    })
], ReservationSnapshotModule);
//# sourceMappingURL=snapshot.module.js.map