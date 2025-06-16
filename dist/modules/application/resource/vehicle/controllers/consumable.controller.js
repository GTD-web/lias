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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConsumableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const vehicle_response_dto_1 = require("../dtos/vehicle-response.dto");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const consumable_service_1 = require("@src/application/resource/vehicle/services/consumable.service");
let UserConsumableController = class UserConsumableController {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
    async findOne(user, consumableId) {
        console.log('consumableId', consumableId);
        return this.consumableService.findOne(user, consumableId);
    }
};
exports.UserConsumableController = UserConsumableController;
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
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], UserConsumableController.prototype, "findOne", null);
exports.UserConsumableController = UserConsumableController = __decorate([
    (0, swagger_1.ApiTags)('4. 차량 소모품 '),
    (0, common_1.Controller)('v1/consumables'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.ConsumableService !== "undefined" && consumable_service_1.ConsumableService) === "function" ? _a : Object])
], UserConsumableController);
//# sourceMappingURL=consumable.controller.js.map