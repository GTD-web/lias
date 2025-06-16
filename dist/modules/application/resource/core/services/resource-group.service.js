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
exports.ResourceGroupService = void 0;
const common_1 = require("@nestjs/common");
const resource_group_1 = require("../usecases/resource-group");
let ResourceGroupService = class ResourceGroupService {
    constructor(findParentResourceGroupsUsecase, findResourceGroupsWithResourceDataUsecase, createResourceGroupUsecase, updateResourceGroupUsecase, reorderResourceGroupsUsecase, deleteResourceGroupUsecase) {
        this.findParentResourceGroupsUsecase = findParentResourceGroupsUsecase;
        this.findResourceGroupsWithResourceDataUsecase = findResourceGroupsWithResourceDataUsecase;
        this.createResourceGroupUsecase = createResourceGroupUsecase;
        this.updateResourceGroupUsecase = updateResourceGroupUsecase;
        this.reorderResourceGroupsUsecase = reorderResourceGroupsUsecase;
        this.deleteResourceGroupUsecase = deleteResourceGroupUsecase;
    }
    async findParentResourceGroups() {
        return this.findParentResourceGroupsUsecase.execute();
    }
    async findResourceGroupsWithResourceData(type) {
        return this.findResourceGroupsWithResourceDataUsecase.execute(type);
    }
    async createResourceGroup(createResourceGroupDto) {
        return this.createResourceGroupUsecase.execute(createResourceGroupDto);
    }
    async reorderResourceGroups(updateResourceGroupOrdersDto) {
        return this.reorderResourceGroupsUsecase.execute(updateResourceGroupOrdersDto);
    }
    async updateResourceGroup(resourceGroupId, updateResourceGroupDto) {
        return this.updateResourceGroupUsecase.execute(resourceGroupId, updateResourceGroupDto);
    }
    async deleteResourceGroup(resourceGroupId) {
        return this.deleteResourceGroupUsecase.execute(resourceGroupId);
    }
    async findParentResourceGroupsForUser() {
        return this.findParentResourceGroupsUsecase.execute();
    }
    async findResourceGroupsWithResourceDataForUser(type) {
        return this.findResourceGroupsWithResourceDataUsecase.execute(type);
    }
};
exports.ResourceGroupService = ResourceGroupService;
exports.ResourceGroupService = ResourceGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resource_group_1.FindParentResourceGroupsUsecase,
        resource_group_1.FindResourceGroupsWithResourceDataUsecase,
        resource_group_1.CreateResourceGroupUsecase,
        resource_group_1.UpdateResourceGroupUsecase,
        resource_group_1.ReorderResourceGroupsUsecase,
        resource_group_1.DeleteResourceGroupUsecase])
], ResourceGroupService);
//# sourceMappingURL=resource-group.service.js.map