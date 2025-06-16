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
exports.UpdateSnapshotUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_snapshot_service_1 = require("@src/domain/reservation-snapshot/reservation-snapshot.service");
const convert_snapshot_usecase_1 = require("./convert-snapshot.usecase");
let UpdateSnapshotUsecase = class UpdateSnapshotUsecase {
    constructor(snapshotService, convertSnapshotUsecase) {
        this.snapshotService = snapshotService;
        this.convertSnapshotUsecase = convertSnapshotUsecase;
    }
    async execute(dto) {
        const updateData = {
            ...dto,
            dateRange: dto.dateRange
                ? {
                    from: new Date(dto.dateRange.from),
                    to: new Date(dto.dateRange.to),
                }
                : undefined,
            selectedResource: dto.selectedResource
                ? {
                    ...dto.selectedResource,
                    startDate: new Date(dto.selectedResource.startDate),
                    endDate: new Date(dto.selectedResource.endDate),
                }
                : undefined,
        };
        const updatedSnapshot = await this.snapshotService.update(dto.snapshotId, updateData);
        return this.convertSnapshotUsecase.execute(updatedSnapshot);
    }
};
exports.UpdateSnapshotUsecase = UpdateSnapshotUsecase;
exports.UpdateSnapshotUsecase = UpdateSnapshotUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_snapshot_service_1.DomainReservationSnapshotService !== "undefined" && reservation_snapshot_service_1.DomainReservationSnapshotService) === "function" ? _a : Object, convert_snapshot_usecase_1.ConvertSnapshotUsecase])
], UpdateSnapshotUsecase);
//# sourceMappingURL=update-snapshot.usecase.js.map