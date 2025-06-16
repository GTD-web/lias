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
exports.FindResourceGroupsWithResourceDataUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const resource_group_service_1 = require("@src/domain/resource-group/resource-group.service");
const typeorm_1 = require("typeorm");
let FindResourceGroupsWithResourceDataUsecase = class FindResourceGroupsWithResourceDataUsecase {
    constructor(resourceService, resourceGroupService) {
        this.resourceService = resourceService;
        this.resourceGroupService = resourceGroupService;
    }
    async execute(type) {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: (0, typeorm_1.IsNull)(),
                ...(type && { type }),
            },
            relations: ['children'],
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsResponse = await Promise.all(resourceGroups.map(async (resourceGroup) => ({
            resourceGroupId: resourceGroup.resourceGroupId,
            ...resourceGroup,
            children: await Promise.all(resourceGroup.children.map(async (child) => ({
                resourceGroupId: child.resourceGroupId,
                ...child,
                resources: (await this.resourceService.findAll({
                    where: {
                        resourceGroupId: child.resourceGroupId,
                    },
                    order: {
                        order: 'ASC',
                    },
                })).map((resource) => ({
                    resourceId: resource.resourceId,
                    name: resource.name,
                    images: resource.images,
                    isAvailable: resource.isAvailable,
                    unavailableReason: resource.unavailableReason,
                    resourceGroupId: child.resourceGroupId,
                    order: resource.order,
                })),
            }))),
        })));
        return resourceGroupsResponse;
    }
};
exports.FindResourceGroupsWithResourceDataUsecase = FindResourceGroupsWithResourceDataUsecase;
exports.FindResourceGroupsWithResourceDataUsecase = FindResourceGroupsWithResourceDataUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_group_service_1.DomainResourceGroupService !== "undefined" && resource_group_service_1.DomainResourceGroupService) === "function" ? _b : Object])
], FindResourceGroupsWithResourceDataUsecase);
//# sourceMappingURL=findResourceGroupsWithResourceData.usecase.js.map