"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainResourceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resource_service_1 = require("./resource.service");
const resource_repository_1 = require("./resource.repository");
const resource_entity_1 = require("@libs/entities/resource.entity");
let DomainResourceModule = class DomainResourceModule {
};
exports.DomainResourceModule = DomainResourceModule;
exports.DomainResourceModule = DomainResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([resource_entity_1.Resource])],
        providers: [resource_service_1.DomainResourceService, resource_repository_1.DomainResourceRepository],
        exports: [resource_service_1.DomainResourceService],
    })
], DomainResourceModule);
//# sourceMappingURL=resource.module.js.map