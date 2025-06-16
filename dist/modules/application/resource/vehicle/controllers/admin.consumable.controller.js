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
exports.AdminConsumableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const create_vehicle_info_dto_1 = require("../dtos/create-vehicle-info.dto");
const update_vehicle_info_dto_1 = require("../dtos/update-vehicle-info.dto");
const vehicle_response_dto_1 = require("../dtos/vehicle-response.dto");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const consumable_service_1 = require("@src/application/resource/vehicle/services/consumable.service");
let AdminConsumableController = class AdminConsumableController {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
    async create(user, createConsumableDto) {
        return this.consumableService.save(user, createConsumableDto);
    }
    async findAll(user, vehicleInfoId) {
        return this.consumableService.findAll(user, vehicleInfoId);
    }
    async findOne(user, consumableId) {
        return this.consumableService.findOne(user, consumableId);
    }
    async update(consumableId, user, updateConsumableDto) {
        return this.consumableService.update(user, consumableId, updateConsumableDto);
    }
    async remove(user, consumableId) {
        await this.consumableService.delete(user, consumableId);
    }
};
exports.AdminConsumableController = AdminConsumableController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '소모품 등록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, create_vehicle_info_dto_1.CreateConsumableDto]),
    __metadata("design:returntype", Promise)
], AdminConsumableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('vehicle/:vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [vehicle_response_dto_1.ConsumableResponseDto],
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('vehicleInfoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], AdminConsumableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], AdminConsumableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: vehicle_response_dto_1.ConsumableResponseDto,
    }),
    __param(0, (0, common_1.Param)('consumableId')),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _e : Object, update_vehicle_info_dto_1.UpdateConsumableDto]),
    __metadata("design:returntype", Promise)
], AdminConsumableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':consumableId'),
    (0, swagger_1.ApiOperation)({ summary: '소모품 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('consumableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _f : Object, String]),
    __metadata("design:returntype", Promise)
], AdminConsumableController.prototype, "remove", null);
exports.AdminConsumableController = AdminConsumableController = __decorate([
    (0, swagger_1.ApiTags)('4. 차량 소모품 - 관리자 '),
    (0, common_1.Controller)('v1/admin/consumables'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _a : Object])
], AdminConsumableController);
//# sourceMappingURL=admin.consumable.controller.js.map