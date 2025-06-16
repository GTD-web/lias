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
exports.AdminReservationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const dtos_index_1 = require("@resource/dtos.index");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const date_util_1 = require("@libs/utils/date.util");
const paginate_query_dto_1 = require("@libs/dtos/paginate-query.dto");
const admin_reservation_service_1 = require("../services/admin-reservation.service");
let AdminReservationController = class AdminReservationController {
    constructor(adminReservationService) {
        this.adminReservationService = adminReservationService;
    }
    async findReservationList(startDate, endDate, resourceType, resourceId, status) {
        return this.adminReservationService.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }
    async findCheckReservationList(query) {
        return this.adminReservationService.findCheckReservationList(query);
    }
    async findOne(user, reservationId) {
        return this.adminReservationService.findOne(user, reservationId);
    }
    async updateStatus(reservationId, updateDto) {
        return this.adminReservationService.updateStatus(reservationId, updateDto);
    }
};
exports.AdminReservationController = AdminReservationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '예약 리스트 조회 #관리자/예약관리',
    }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 리스트 조회 성공',
        type: [reservation_response_dto_1.ReservationWithRelationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        type: String,
        required: false,
        example: date_util_1.DateUtil.now().addDays(-20).format('YYYY-MM-DD'),
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        type: String,
        required: false,
        example: date_util_1.DateUtil.now().addDays(30).format('YYYY-MM-DD'),
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'resourceId', type: String, required: false, example: '78117aaf-a203-43a3-bb38-51ec91ca935a' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: reservation_type_enum_1.ReservationStatus,
        description: `Available values : ${Object.values(reservation_type_enum_1.ReservationStatus).join(', ')}`,
        isArray: true,
        required: false,
        example: [reservation_type_enum_1.ReservationStatus.CONFIRMED],
    }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('resourceType')),
    __param(3, (0, common_1.Query)('resourceId')),
    __param(4, (0, common_1.Query)('status', new common_1.ParseArrayPipe({ optional: true, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object, String, Array]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "findReservationList", null);
__decorate([
    (0, common_1.Get)('check'),
    (0, swagger_1.ApiOperation)({ summary: '확인이 필요한 예약들' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '확인이 필요한 예약들 조회 성공',
        type: [reservation_response_dto_1.ReservationWithRelationsResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "findCheckReservationList", null);
__decorate([
    (0, common_1.Get)(':reservationId'),
    (0, swagger_1.ApiOperation)({ summary: '예약 상세 조회 #사용자/예약상세페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 상세 조회 성공',
        type: reservation_response_dto_1.ReservationWithRelationsResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':reservationId/status'),
    (0, swagger_1.ApiOperation)({ summary: '예약 상태 수정 #관리자/예약관리/예약상세' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 상태 수정 성공',
        type: dtos_index_1.ReservationResponseDto,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof dtos_index_1.UpdateReservationStatusDto !== "undefined" && dtos_index_1.UpdateReservationStatusDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "updateStatus", null);
exports.AdminReservationController = AdminReservationController = __decorate([
    (0, swagger_1.ApiTags)('2. 예약 - 관리자 '),
    (0, common_1.Controller)('v1/admin/reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [admin_reservation_service_1.AdminReservationService])
], AdminReservationController);
//# sourceMappingURL=admin.reservation.controller.js.map