"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainConsumableModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const consumable_service_1 = require("./consumable.service");
const consumable_repository_1 = require("./consumable.repository");
const consumable_entity_1 = require("@libs/entities/consumable.entity");
let DomainConsumableModule = class DomainConsumableModule {
};
exports.DomainConsumableModule = DomainConsumableModule;
exports.DomainConsumableModule = DomainConsumableModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consumable_entity_1.Consumable])],
        providers: [consumable_service_1.DomainConsumableService, consumable_repository_1.DomainConsumableRepository],
        exports: [consumable_service_1.DomainConsumableService],
    })
], DomainConsumableModule);
//# sourceMappingURL=consumable.module.js.map