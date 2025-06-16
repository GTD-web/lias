"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainAccommodationInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accommodation_info_service_1 = require("./accommodation-info.service");
const accommodation_info_repository_1 = require("./accommodation-info.repository");
const accommodation_info_entity_1 = require("@libs/entities/accommodation-info.entity");
let DomainAccommodationInfoModule = class DomainAccommodationInfoModule {
};
exports.DomainAccommodationInfoModule = DomainAccommodationInfoModule;
exports.DomainAccommodationInfoModule = DomainAccommodationInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accommodation_info_entity_1.AccommodationInfo])],
        providers: [accommodation_info_service_1.DomainAccommodationInfoService, accommodation_info_repository_1.DomainAccommodationInfoRepository],
        exports: [accommodation_info_service_1.DomainAccommodationInfoService],
    })
], DomainAccommodationInfoModule);
//# sourceMappingURL=accommodation-info.module.js.map