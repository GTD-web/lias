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
exports.UserMaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const create_vehicle_info_dto_1 = require("../dtos/create-vehicle-info.dto");
const vehicle_response_dto_1 = require("../dtos/vehicle-response.dto");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const maintenance_service_1 = require("@src/application/resource/vehicle/services/maintenance.service");
let UserMaintenanceController = class UserMaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async create(user, createMaintenanceDto) {
        return this.maintenanceService.save(user, createMaintenanceDto);
    }
};
exports.UserMaintenanceController = UserMaintenanceController;
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
], UserMaintenanceController.prototype, "create", null);
exports.UserMaintenanceController = UserMaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('4. 차량 정비 이력 '),
    (0, common_1.Controller)('v1/maintenances'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.RESOURCE_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.MaintenanceService !== "undefined" && maintenance_service_1.MaintenanceService) === "function" ? _a : Object])
], UserMaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map