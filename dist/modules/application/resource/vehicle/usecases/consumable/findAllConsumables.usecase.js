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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllConsumablesUsecase = void 0;
const common_1 = require("@nestjs/common");
const consumable_service_1 = require("@src/domain/consumable/consumable.service");
let FindAllConsumablesUsecase = class FindAllConsumablesUsecase {
    constructor(consumableService) {
        this.consumableService = consumableService;
    }
    async execute(user, vehicleInfoId) {
        const consumables = await this.consumableService.findAll({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }
};
exports.FindAllConsumablesUsecase = FindAllConsumablesUsecase;
exports.FindAllConsumablesUsecase = FindAllConsumablesUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof consumable_service_1.DomainConsumableService !== "undefined" && consumable_service_1.DomainConsumableService) === "function" ? _a : Object])
], FindAllConsumablesUsecase);
//# sourceMappingURL=findAllConsumables.usecase.js.map