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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReservationSnapshotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const snapshot_service_1 = require("../snapshot.service");
const reservation_snapshot_dto_1 = require("../dtos/reservation-snapshot.dto");
let UserReservationSnapshotController = class UserReservationSnapshotController {
    constructor(snapshotService) {
        this.snapshotService = snapshotService;
    }
    async createSnapshot(user, createSnapshotDto) {
        return this.snapshotService.createSnapshot(user, createSnapshotDto);
    }
    async updateSnapshot(user, updateSnapshotDto) {
        return this.snapshotService.updateSnapshot(user, updateSnapshotDto);
    }
    async findUserSnapshot(user) {
        return this.snapshotService.findUserSnapshot(user);
    }
    async deleteSnapshot(user, snapshotId) {
        await this.snapshotService.deleteSnapshot(user, snapshotId);
    }
};
exports.UserReservationSnapshotController = UserReservationSnapshotController;
__decorate([
    (0, common_1.Post)('snapshot'),
    (0, swagger_1.ApiOperation)({ summary: '예약 스냅샷 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 스냅샷 생성 성공',
        type: reservation_snapshot_dto_1.ReservationSnapshotResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _a : Object, reservation_snapshot_dto_1.CreateReservationSnapshotDto]),
    __metadata("design:returntype", Promise)
], UserReservationSnapshotController.prototype, "createSnapshot", null);
__decorate([
    (0, common_1.Patch)('snapshot'),
    (0, swagger_1.ApiOperation)({ summary: '예약 스냅샷 업데이트' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 스냅샷 업데이트 성공',
        type: reservation_snapshot_dto_1.ReservationSnapshotResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, reservation_snapshot_dto_1.UpdateReservationSnapshotDto]),
    __metadata("design:returntype", Promise)
], UserReservationSnapshotController.prototype, "updateSnapshot", null);
__decorate([
    (0, common_1.Get)('snapshot/user'),
    (0, swagger_1.ApiOperation)({ summary: '유저의 예약 스냅샷 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 스냅샷 조회 성공',
        type: reservation_snapshot_dto_1.ReservationSnapshotResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserReservationSnapshotController.prototype, "findUserSnapshot", null);
__decorate([
    (0, common_1.Delete)('snapshot/:snapshotId'),
    (0, swagger_1.ApiOperation)({ summary: '예약 스냅샷 삭제' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('snapshotId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], UserReservationSnapshotController.prototype, "deleteSnapshot", null);
exports.UserReservationSnapshotController = UserReservationSnapshotController = __decorate([
    (0, swagger_1.ApiTags)('2. 예약 '),
    (0, common_1.Controller)('v1/reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [snapshot_service_1.SnapshotService])
], UserReservationSnapshotController);
//# sourceMappingURL=snapshot.controller.js.map