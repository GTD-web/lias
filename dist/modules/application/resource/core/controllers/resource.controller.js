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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResourceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const entities_1 = require("@libs/entities");
const resource_response_dto_1 = require("@src/application/resource/core/dtos/resource-response.dto");
const available_time_response_dto_1 = require("@src/application/resource/core/dtos/available-time-response.dto");
const resource_query_dto_1 = require("@src/application/resource/core/dtos/resource-query.dto");
const check_availability_dto_1 = require("@src/application/resource/core/dtos/check-availability.dto");
const resource_service_1 = require("@src/application/resource/core/services/resource.service");
let UserResourceController = class UserResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate, isMine) {
        console.log('findResourcesByTypeAndDateWithReservations');
        return this.resourceService.findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate, isMine);
    }
    async findAvailableTime(query) {
        return this.resourceService.findAvailableTime(query);
    }
    async checkAvailability(query) {
        const isAvailable = await this.resourceService.checkAvailability(query.resourceId, query.startDate, query.endDate, query.reservationId);
        return {
            isAvailable,
        };
    }
    async findOne(user, resourceId) {
        return this.resourceService.findResourceDetailForUser(user.employeeId, resourceId);
    }
};
exports.UserResourceController = UserResourceController;
__decorate([
    (0, common_1.Get)('reservations'),
    (0, swagger_1.ApiOperation)({ summary: '자원 별 예약 목록 조회 #사용자/자원예약/리스트 #사용자/세부예약내역' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesAndReservationsResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', example: '2025-01-01 or 2025-01-01 00:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'isMine', type: Boolean, required: false, example: true }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('isMine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResourceController.prototype, "findResourcesByTypeAndDateWithReservations", null);
__decorate([
    (0, common_1.Get)('availability'),
    (0, swagger_1.ApiOperation)({ summary: '예약 가능 시간 조회 #사용자/예약 생성 페이지' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 가능 시간 조회 성공',
        type: available_time_response_dto_1.ResourceAvailabilityDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'resourceType', enum: resource_type_enum_1.ResourceType, required: true, example: resource_type_enum_1.ResourceType.MEETING_ROOM }),
    (0, swagger_1.ApiQuery)({
        name: 'resourceGroupId',
        type: String,
        required: true,
        example: '78117aaf-a203-43a3-bb38-51ec91ca935a',
    }),
    (0, swagger_1.ApiQuery)({ name: 'reservationId', type: String, required: false, example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', type: String, required: false, example: '2025-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'startTime', type: String, required: false, example: '09:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'endTime', type: String, required: false, example: '18:00:00' }),
    (0, swagger_1.ApiQuery)({ name: 'am', type: Boolean, required: false, example: true }),
    (0, swagger_1.ApiQuery)({ name: 'pm', type: Boolean, required: false, example: true }),
    (0, swagger_1.ApiQuery)({ name: 'timeUnit', type: Number, required: false, example: 30 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof resource_query_dto_1.ResourceQueryDto !== "undefined" && resource_query_dto_1.ResourceQueryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserResourceController.prototype, "findAvailableTime", null);
__decorate([
    (0, common_1.Get)('check-availability'),
    (0, swagger_1.ApiOperation)({ summary: '예약 시간 가용성 확인' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '예약 시간 가용성 확인 결과',
        type: check_availability_dto_1.CheckAvailabilityResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof check_availability_dto_1.CheckAvailabilityQueryDto !== "undefined" && check_availability_dto_1.CheckAvailabilityQueryDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserResourceController.prototype, "checkAvailability", null);
__decorate([
    (0, common_1.Get)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 상세 조회 ' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: resource_response_dto_1.ResourceResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _f : Object, String]),
    __metadata("design:returntype", Promise)
], UserResourceController.prototype, "findOne", null);
exports.UserResourceController = UserResourceController = __decorate([
    (0, swagger_1.ApiTags)('3. 자원 '),
    (0, common_1.Controller)('v1/resources'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object])
], UserResourceController);
//# sourceMappingURL=resource.controller.js.map