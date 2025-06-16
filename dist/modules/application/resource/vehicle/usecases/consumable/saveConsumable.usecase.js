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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveConsumableUsecase = void 0;
const common_1 = require("@nestjs/common");
const consumable_service_1 = require("@src/domain/consumable/consumable.service");
const error_message_1 = require("@libs/constants/error-message");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
let SaveConsumableUsecase = class SaveConsumableUsecase {
    constructor(consumableService, vehicleInfoService) {
        this.consumableService = consumableService;
        this.vehicleInfoService = vehicleInfoService;
    }
    async execute(user, createConsumableDto) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: createConsumableDto.vehicleInfoId,
            },
            relations: ['consumables'],
        });
        if (!vehicleInfo)
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        createConsumableDto.initMileage = vehicleInfo.totalMileage;
        if (vehicleInfo.consumables.length > 0) {
            const hasSameName = vehicleInfo.consumables.some((consumable) => consumable.name === createConsumableDto.name);
            if (hasSameName)
                throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.CONSUMABLE.ALREADY_EXISTS);
        }
        return this.consumableService.save(createConsumableDto);
    }
};
exports.SaveConsumableUsecase = SaveConsumableUsecase;
exports.SaveConsumableUsecase = SaveConsumableUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.DomainConsumableService !== "undefined" && consumable_service_1.DomainConsumableService) === "function" ? _a : Object, typeof (_b = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _b : Object])
], SaveConsumableUsecase);
//# sourceMappingURL=saveConsumable.usecase.js.map