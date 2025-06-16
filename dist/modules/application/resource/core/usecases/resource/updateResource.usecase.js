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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResourceUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_response_dto_1 = require("../../dtos/resource-response.dto");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
const resource_service_1 = require("@src/domain/resource/resource.service");
const resource_manager_service_1 = require("@src/domain/resource-manager/resource-manager.service");
const file_service_1 = require("@src/domain/file/file.service");
let UpdateResourceUsecase = class UpdateResourceUsecase {
    constructor(resourceService, resourceManagerService, dataSource, fileService) {
        this.resourceService = resourceService;
        this.resourceManagerService = resourceManagerService;
        this.dataSource = dataSource;
        this.fileService = fileService;
    }
    async execute(resourceId, updateRequest) {
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
            },
            relations: ['resourceGroup'],
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateRequest.resource) {
                if (!updateRequest.resource.images)
                    updateRequest.resource.images = [];
                updateRequest.resource.images = updateRequest.resource.images.map((image) => this.fileService.getFileUrl(image));
                await this.resourceService.update(resourceId, updateRequest.resource, { queryRunner });
                await this.fileService.updateTemporaryFiles(updateRequest.resource.images, false, { queryRunner });
            }
            if (updateRequest.managers) {
                const newManagerIds = updateRequest.managers.map((m) => m.employeeId);
                const currentManagers = await this.resourceManagerService.findAll({
                    where: {
                        resourceId: resourceId,
                    },
                });
                const currentManagerIds = currentManagers.map((m) => m.employeeId);
                const managersToRemove = currentManagers.filter((manager) => !newManagerIds.includes(manager.employeeId));
                await Promise.all(managersToRemove.map((manager) => this.resourceManagerService.delete(manager.resourceManagerId, { queryRunner })));
                const managersToAdd = newManagerIds.filter((employeeId) => !currentManagerIds.includes(employeeId));
                await Promise.all(managersToAdd.map((employeeId) => this.resourceManagerService.save({ resourceId, employeeId }, { queryRunner })));
            }
            await queryRunner.commitTransaction();
            return this.findResourceDetailForAdmin(resourceId);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_UPDATE);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findResourceDetailForAdmin(resourceId) {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        return new resource_response_dto_1.ResourceResponseDto(resource);
    }
};
exports.UpdateResourceUsecase = UpdateResourceUsecase;
exports.UpdateResourceUsecase = UpdateResourceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_manager_service_1.DomainResourceManagerService !== "undefined" && resource_manager_service_1.DomainResourceManagerService) === "function" ? _b : Object, typeorm_1.DataSource, typeof (_c = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _c : Object])
], UpdateResourceUsecase);
//# sourceMappingURL=updateResource.usecase.js.map