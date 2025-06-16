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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const create_vehicle_info_dto_1 = require("../dtos/create-vehicle-info.dto");
const update_vehicle_info_dto_1 = require("../dtos/update-vehicle-info.dto");
const vehicle_response_dto_1 = require("../dtos/vehicle-response.dto");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const paginate_query_dto_1 = require("@libs/dtos/paginate-query.dto");
const maintenance_service_1 = require("@src/application/resource/vehicle/services/maintenance.service");
let AdminMaintenanceController = class AdminMaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async create(user, createMaintenanceDto) {
        return this.maintenanceService.save(user, createMaintenanceDto);
    }
    async findAll(user, vehicleInfoId, query) {
        const { page, limit } = query;
        return this.maintenanceService.findAllByVehicleInfoId(user, vehicleInfoId, page, limit);
    }
    async findOne(user, maintenanceId) {
        return this.maintenanceService.findOne(user, maintenanceId);
    }
    async update(maintenanceId, updateMaintenanceDto, user) {
        return this.maintenanceService.update(user, maintenanceId, updateMaintenanceDto);
    }
    async remove(user, maintenanceId) {
        return this.maintenanceService.delete(user, maintenanceId);
    }
};
exports.AdminMaintenanceController = AdminMaintenanceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, create_vehicle_info_dto_1.CreateMaintenanceDto]),
    __metadata("design:returntype", Promise)
], AdminMaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('vehicle/:vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력 목록을 조회했습니다.',
        type: [vehicle_response_dto_1.MaintenanceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('vehicleInfoId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _c : Object, String, typeof (_d = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminMaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 상세 이력 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 상세 이력을 조회했습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _e : Object, String]),
    __metadata("design:returntype", Promise)
], AdminMaintenanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 수정되었습니다.',
        type: vehicle_response_dto_1.MaintenanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('maintenanceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_info_dto_1.UpdateMaintenanceDto, typeof (_f = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AdminMaintenanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':maintenanceId'),
    (0, swagger_1.ApiOperation)({ summary: '정비 이력 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '정비 이력이 삭제되었습니다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('maintenanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _g : Object, String]),
    __metadata("design:returntype", Promise)
], AdminMaintenanceController.prototype, "remove", null);
exports.AdminMaintenanceController = AdminMaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('4. 차량 정비 이력 - 관리자 '),
    (0, common_1.Controller)('v1/admin/maintenances'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _a : Object])
], AdminMaintenanceController);
//# sourceMappingURL=admin.maintenance.controller.js.map