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
exports.DomainConsumableService = void 0;
const common_1 = require("@nestjs/common");
const consumable_repository_1 = require("./consumable.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainConsumableService = class DomainConsumableService extends base_service_1.BaseService {
    constructor(consumableRepository) {
        super(consumableRepository);
        this.consumableRepository = consumableRepository;
    }
    async findByConsumableId(consumableId) {
        const consumable = await this.consumableRepository.findOne({
            where: { consumableId },
        });
        if (!consumable) {
            throw new common_1.NotFoundException('소모품을 찾을 수 없습니다.');
        }
        return consumable;
    }
    async findByVehicleInfoId(vehicleInfoId) {
        return this.consumableRepository.findAll({
            where: { vehicleInfoId },
            relations: ['vehicleInfo', 'maintenances'],
        });
    }
    async findNeedReplacement() {
        return this.consumableRepository.findAll({
            where: { notifyReplacementCycle: true },
            relations: ['vehicleInfo'],
        });
    }
    async bulkCreate(consumables, repositoryOptions) {
        return this.consumableRepository.bulkCreate(consumables, repositoryOptions);
    }
    async count(repositoryOptions) {
        return this.consumableRepository.count(repositoryOptions);
    }
};
exports.DomainConsumableService = DomainConsumableService;
exports.DomainConsumableService = DomainConsumableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [consumable_repository_1.DomainConsumableRepository])
], DomainConsumableService);
//# sourceMappingURL=consumable.service.js.map