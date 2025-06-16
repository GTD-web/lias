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
exports.DeleteResourceGroupUsecase = void 0;
const error_message_1 = require("@libs/constants/error-message");
const common_1 = require("@nestjs/common");
const resource_group_service_1 = require("@src/domain/resource-group/resource-group.service");
const resource_service_1 = require("@src/domain/resource/resource.service");
const typeorm_1 = require("typeorm");
let DeleteResourceGroupUsecase = class DeleteResourceGroupUsecase {
    constructor(resourceGroupService, resourceService, dataSource) {
        this.resourceGroupService = resourceGroupService;
        this.resourceService = resourceService;
        this.dataSource = dataSource;
    }
    async execute(resourceGroupId) {
        const resourceGroup = await this.resourceGroupService.findOne({
            where: {
                resourceGroupId: resourceGroupId,
            },
            relations: ['resources'],
        });
        if (!resourceGroup) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.NOT_FOUND);
        }
        if (resourceGroup.resources.length > 0) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.HAS_RESOURCES);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.resourceGroupService.delete(resourceGroupId, { queryRunner });
            const siblings = await this.resourceGroupService.findAll({
                where: {
                    resourceGroupId: (0, typeorm_1.Not)(resourceGroupId),
                    parentResourceGroupId: resourceGroup.parentResourceGroupId,
                },
                order: {
                    order: 'ASC',
                },
            });
            for (let i = 0; i < siblings.length; i++) {
                await this.resourceGroupService.update(siblings[i].resourceGroupId, { order: i }, { queryRunner });
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.FAILED_REORDER);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DeleteResourceGroupUsecase = DeleteResourceGroupUsecase;
exports.DeleteResourceGroupUsecase = DeleteResourceGroupUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_group_service_1.DomainResourceGroupService !== "undefined" && resource_group_service_1.DomainResourceGroupService) === "function" ? _a : Object, typeof (_b = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _b : Object, typeorm_1.DataSource])
], DeleteResourceGroupUsecase);
//# sourceMappingURL=deleteResourceGroup.usecase.js.map