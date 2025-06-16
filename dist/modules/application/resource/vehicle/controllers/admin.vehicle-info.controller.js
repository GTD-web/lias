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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVehicleInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const update_vehicle_info_dto_1 = require("../dtos/update-vehicle-info.dto");
const vehicle_response_dto_1 = require("../dtos/vehicle-response.dto");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const vehicle_info_service_1 = require("@src/application/resource/vehicle/services/vehicle-info.service");
let AdminVehicleInfoController = class AdminVehicleInfoController {
    constructor(vehicleInfoService) {
        this.vehicleInfoService = vehicleInfoService;
    }
    async findVehicleInfo(vehicleInfoId) {
        return this.vehicleInfoService.findVehicleInfo(vehicleInfoId);
    }
    async update(vehicleInfoId, updateVehicleInfoDto) {
        return this.vehicleInfoService.updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto);
    }
};
exports.AdminVehicleInfoController = AdminVehicleInfoController;
__decorate([
    (0, common_1.Get)(':vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보를 성공적으로 조회했습니다.',
        type: vehicle_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('vehicleInfoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminVehicleInfoController.prototype, "findVehicleInfo", null);
__decorate([
    (0, common_1.Patch)(':vehicleInfoId'),
    (0, swagger_1.ApiOperation)({ summary: '차량 정보 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '차량 정보가 성공적으로 수정되었습니다.',
        type: vehicle_response_dto_1.VehicleInfoResponseDto,
    }),
    __param(0, (0, common_1.Param)('vehicleInfoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_info_dto_1.UpdateVehicleInfoDto]),
    __metadata("design:returntype", Promise)
], AdminVehicleInfoController.prototype, "update", null);
exports.AdminVehicleInfoController = AdminVehicleInfoController = __decorate([
    (0, swagger_1.ApiTags)('4. 차량 정보 - 관리자 '),
    (0, common_1.Controller)('v1/admin/vehicle-info'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.VehicleInfoService !== "undefined" && vehicle_info_service_1.VehicleInfoService) === "function" ? _a : Object])
], AdminVehicleInfoController);
//# sourceMappingURL=admin.vehicle-info.controller.js.map