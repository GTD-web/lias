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
exports.DeleteSnapshotUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_snapshot_service_1 = require("@src/domain/reservation-snapshot/reservation-snapshot.service");
let DeleteSnapshotUsecase = class DeleteSnapshotUsecase {
    constructor(snapshotService) {
        this.snapshotService = snapshotService;
    }
    async execute(snapshotId) {
        await this.snapshotService.delete(snapshotId);
    }
};
exports.DeleteSnapshotUsecase = DeleteSnapshotUsecase;
exports.DeleteSnapshotUsecase = DeleteSnapshotUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_snapshot_service_1.DomainReservationSnapshotService !== "undefined" && reservation_snapshot_service_1.DomainReservationSnapshotService) === "function" ? _a : Object])
], DeleteSnapshotUsecase);
//# sourceMappingURL=delete-snapshot.usecase.js.map