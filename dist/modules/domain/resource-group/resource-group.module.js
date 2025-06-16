"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainResourceGroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resource_group_service_1 = require("./resource-group.service");
const resource_group_repository_1 = require("./resource-group.repository");
const resource_group_entity_1 = require("@libs/entities/resource-group.entity");
let DomainResourceGroupModule = class DomainResourceGroupModule {
};
exports.DomainResourceGroupModule = DomainResourceGroupModule;
exports.DomainResourceGroupModule = DomainResourceGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([resource_group_entity_1.ResourceGroup])],
        providers: [resource_group_service_1.DomainResourceGroupService, resource_group_repository_1.DomainResourceGroupRepository],
        exports: [resource_group_service_1.DomainResourceGroupService],
    })
], DomainResourceGroupModule);
//# sourceMappingURL=resource-group.module.js.map