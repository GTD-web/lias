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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReservationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const create_reservation_dto_1 = require("../dtos/create-reservation.dto");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const paginate_query_dto_1 = require("@libs/dtos/paginate-query.dto");
const update_reservation_dto_1 = require("../dtos/update-reservation.dto");
const reservation_service_1 = require("../services/reservation.service");
const reservation_response_dto_2 = require("../dtos/reservation-response.dto");
let UserReservationController = class UserReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async create(user, createDto) {
        return this.reservationService.create(user, createDto);
    }
    async findMyReservationList(user, resourceType, startDate, endDate, query) {
        const { page, limit } = query;
        return this.reservationService.findMyReservationList(user.employeeId, page, limit, resourceType, startDate, endDate);
    }
    async findResourceReservationList(user, resourceId, query, month, isMine) {
        const { page, limit } = query;
        return this.reservationService.findResourceReservationList(user.employeeId, resourceId, page, limit, month, isMine);
    }
    async findMyUsingReservationList(user) {
        return this.reservationService.findMyUsingReservationList(user.employeeId);
    }
    async findMyUpcomingReservationList(user, resourceType, query) {
        return this.reservationService.findMyUpcomingReservationList(user.employeeId, query, resourceType);
    }
    async findMyUpcomingSchedules(user, resourceType, query) {
        return this.reservationService.findMyAllSchedules(user.employeeId, query, resourceType);
    }
    async findCalendar(user, startDate, endDate, resourceType, isMine) {
        return this.reservationService.findCalendar(user, startDate, endDate, resourceType, isMine);
    }
    async findOne(user, reservationId) {
        return this.reservationService.findReservationDetail(user, reservationId);
    }
    async updateReservation(user, reservationId, updateDto) {
        await this.reservationService.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationService.updateReservation(reservationId, updateDto);
    }
    async updateStatusCancel(user, reservationId) {
        await this.reservationService.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationService.updateStatusCancel(reservationId);
    }
    async returnVehicle(user, reservationId, returnDto) {
        return this.reservationService.returnVehicle(user, reservationId, returnDto);
    }
};
exports.UserReservationController = UserReservationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '예약 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 생성 성공',
        type: reservation_response_dto_1.CreateReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _a : Object, create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: '내 예약 리스트 조회, 자원 타입별 ' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 예약 리스트 조회',
        type: [reservation_response_dto_1.GroupedReservationResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, example: '2025-01 / 2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, example: '2025-12 / 2025-12-31' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('resourceType')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object, String, String, typeof (_d = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findMyReservationList", null);
__decorate([
    (0, common_1.Get)('resource/:resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원별 예약 리스트 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원별 예약 리스트 조회',
        type: reservation_response_dto_1.GroupedReservationWithResourceResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'month', type: String, example: '2025-04' }),
    (0, swagger_1.ApiQuery)({ name: 'isMine', type: Boolean, required: false, example: true }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('resourceId')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Query)('month')),
    __param(4, (0, common_1.Query)('isMine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _e : Object, String, typeof (_f = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _f : Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findResourceReservationList", null);
__decorate([
    (0, common_1.Get)('my-using'),
    (0, swagger_1.ApiOperation)({ summary: '내 이용중인 예약 리스트 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 이용중인 예약 리스트 조회',
        type: [reservation_response_dto_1.ReservationWithRelationsResponseDto],
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findMyUsingReservationList", null);
__decorate([
    (0, common_1.Get)('my-upcoming'),
    (0, swagger_1.ApiOperation)({ summary: '내 예약 리스트 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 예약 리스트 조회',
        type: [reservation_response_dto_1.GroupedReservationResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('resourceType')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _h : Object, typeof (_j = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _j : Object, typeof (_k = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findMyUpcomingReservationList", null);
__decorate([
    (0, common_1.Get)('my-upcoming-schedules'),
    (0, swagger_1.ApiOperation)({ summary: '내 일정 리스트 조회 (예약자/참석자 모두 포함)' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '내 일정 리스트 조회 (예약자/참석자 모두 포함)',
        type: [reservation_response_dto_1.GroupedReservationResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('resourceType')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _l : Object, typeof (_m = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _m : Object, typeof (_o = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findMyUpcomingSchedules", null);
__decorate([
    (0, common_1.Get)('calendar'),
    (0, swagger_1.ApiOperation)({ summary: '캘린더 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '캘린더 조회 성공',
        type: reservation_response_dto_1.CalendarResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', example: '2025-12-31' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: false, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({ name: 'isMine', type: Boolean, required: false, example: true }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('resourceType')),
    __param(4, (0, common_1.Query)('isMine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _p : Object, String, String, typeof (_q = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _q : Object, Boolean]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findCalendar", null);
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
    __metadata("design:paramtypes", [typeof (_r = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _r : Object, String]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':reservationId'),
    (0, swagger_1.ApiOperation)({ summary: '예약 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 수정 성공',
        type: reservation_response_dto_2.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _s : Object, String, update_reservation_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "updateReservation", null);
__decorate([
    (0, common_1.Patch)(':reservationId/status/cancel'),
    (0, swagger_1.ApiOperation)({ summary: '예약 취소 #사용자/예약상세페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 상태 수정 성공',
        type: reservation_response_dto_2.ReservationResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _t : Object, String]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "updateStatusCancel", null);
__decorate([
    (0, common_1.Patch)(':reservationId/return-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: '차량 반납 #사용자/자원예약/차량반납' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 반납 성공',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _u : Object, String, update_reservation_dto_1.ReturnVehicleDto]),
    __metadata("design:returntype", Promise)
], UserReservationController.prototype, "returnVehicle", null);
exports.UserReservationController = UserReservationController = __decorate([
    (0, swagger_1.ApiTags)('2. 예약 '),
    (0, common_1.Controller)('v1/reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], UserReservationController);
//# sourceMappingURL=reservation.controller.js.map