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
exports.DomainResourceGroupService = void 0;
const common_1 = require("@nestjs/common");
const resource_group_repository_1 = require("./resource-group.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainResourceGroupService = class DomainResourceGroupService extends base_service_1.BaseService {
    constructor(resourceGroupRepository) {
        super(resourceGroupRepository);
        this.resourceGroupRepository = resourceGroupRepository;
    }
    async findByResourceGroupId(resourceGroupId) {
        const resourceGroup = await this.resourceGroupRepository.findOne({
            where: { resourceGroupId },
        });
        if (!resourceGroup) {
            throw new common_1.NotFoundException('리소스 그룹을 찾을 수 없습니다.');
        }
        return resourceGroup;
    }
    async findByType(type) {
        return this.resourceGroupRepository.findAll({
            where: { type },
            relations: ['resources', 'parent', 'children'],
            order: { order: 'ASC' },
        });
    }
    async findByParentId(parentResourceGroupId) {
        return this.resourceGroupRepository.findAll({
            where: { parentResourceGroupId },
            relations: ['resources', 'children'],
            order: { order: 'ASC' },
        });
    }
    async findRootGroups() {
        return this.resourceGroupRepository.findAll({
            where: { parentResourceGroupId: null },
            relations: ['resources', 'children'],
            order: { order: 'ASC' },
        });
    }
};
exports.DomainResourceGroupService = DomainResourceGroupService;
exports.DomainResourceGroupService = DomainResourceGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resource_group_repository_1.DomainResourceGroupRepository])
], DomainResourceGroupService);
//# sourceMappingURL=resource-group.service.js.map