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
exports.DeleteResourceUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const resource_manager_service_1 = require("@src/domain/resource-manager/resource-manager.service");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
let DeleteResourceUsecase = class DeleteResourceUsecase {
    constructor(resourceService, resourceManagerService, dataSource) {
        this.resourceService = resourceService;
        this.resourceManagerService = resourceManagerService;
        this.dataSource = dataSource;
    }
    async execute(resourceId) {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup', 'resourceManagers'],
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        if (resource.isAvailable) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.IS_AVAILABLE);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.resourceService.update(resourceId, { resourceGroupId: null }, { queryRunner });
            for (const manager of resource.resourceManagers) {
                await this.resourceManagerService.delete(manager.resourceManagerId, { queryRunner });
            }
            await this.resourceService.softDelete(resourceId, { queryRunner });
            const resources = await this.resourceService.findAll({
                where: {
                    resourceId: (0, typeorm_1.Not)(resourceId),
                    resourceGroupId: resource.resourceGroupId,
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
                order: {
                    order: 'ASC',
                },
            });
            for (let i = 0; i < resources.length; i++) {
                await this.resourceService.update(resources[i].resourceId, { order: i }, { queryRunner });
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_DELETE);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DeleteResourceUsecase = DeleteResourceUsecase;
exports.DeleteResourceUsecase = DeleteResourceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_manager_service_1.DomainResourceManagerService !== "undefined" && resource_manager_service_1.DomainResourceManagerService) === "function" ? _b : Object, typeorm_1.DataSource])
], DeleteResourceUsecase);
//# sourceMappingURL=deleteResource.usecase.js.map