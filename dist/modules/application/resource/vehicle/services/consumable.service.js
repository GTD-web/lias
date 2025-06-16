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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumableService = void 0;
const common_1 = require("@nestjs/common");
const saveConsumable_usecase_1 = require("../usecases/consumable/saveConsumable.usecase");
const updateConsumable_usecase_1 = require("../usecases/consumable/updateConsumable.usecase");
const deleteConsumable_usecase_1 = require("../usecases/consumable/deleteConsumable.usecase");
const findAllConsumables_usecase_1 = require("../usecases/consumable/findAllConsumables.usecase");
const findOneConsumable_usecase_1 = require("../usecases/consumable/findOneConsumable.usecase");
let ConsumableService = class ConsumableService {
    constructor(saveConsumableUsecase, updateConsumableUsecase, deleteConsumableUsecase, findAllConsumablesUsecase, findOneConsumableUsecase) {
        this.saveConsumableUsecase = saveConsumableUsecase;
        this.updateConsumableUsecase = updateConsumableUsecase;
        this.deleteConsumableUsecase = deleteConsumableUsecase;
        this.findAllConsumablesUsecase = findAllConsumablesUsecase;
        this.findOneConsumableUsecase = findOneConsumableUsecase;
    }
    async save(user, createConsumableDto) {
        return this.saveConsumableUsecase.execute(user, createConsumableDto);
    }
    async findAll(user, vehicleInfoId) {
        return this.findAllConsumablesUsecase.execute(user, vehicleInfoId);
    }
    async findOne(user, consumableId) {
        return this.findOneConsumableUsecase.execute(user, consumableId);
    }
    async update(user, consumableId, updateConsumableDto) {
        return this.updateConsumableUsecase.execute(user, consumableId, updateConsumableDto);
    }
    async delete(user, consumableId) {
        return this.deleteConsumableUsecase.execute(user, consumableId);
    }
};
exports.ConsumableService = ConsumableService;
exports.ConsumableService = ConsumableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [saveConsumable_usecase_1.SaveConsumableUsecase,
        updateConsumable_usecase_1.UpdateConsumableUsecase,
        deleteConsumable_usecase_1.DeleteConsumableUsecase,
        findAllConsumables_usecase_1.FindAllConsumablesUsecase,
        findOneConsumable_usecase_1.FindOneConsumableUsecase])
], ConsumableService);
//# sourceMappingURL=consumable.service.js.map