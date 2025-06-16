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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResourceWithInfosUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const resource_group_service_1 = require("@src/domain/resource-group/resource-group.service");
const resource_manager_service_1 = require("@src/domain/resource-manager/resource-manager.service");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const meeting_room_info_service_1 = require("@src/domain/meeting-room-info/meeting-room-info.service");
const accommodation_info_service_1 = require("@src/domain/accommodation-info/accommodation-info.service");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const file_service_1 = require("@src/domain/file/file.service");
const equipment_info_service_1 = require("@src/domain/equipment-info/equipment-info.service");
let CreateResourceWithInfosUsecase = class CreateResourceWithInfosUsecase {
    constructor(resourceService, resourceGroupService, resourceManagerService, vehicleInfoService, meetingRoomInfoService, accommodationInfoService, equipmentInfoService, fileService, dataSource) {
        this.resourceService = resourceService;
        this.resourceGroupService = resourceGroupService;
        this.resourceManagerService = resourceManagerService;
        this.vehicleInfoService = vehicleInfoService;
        this.meetingRoomInfoService = meetingRoomInfoService;
        this.accommodationInfoService = accommodationInfoService;
        this.equipmentInfoService = equipmentInfoService;
        this.fileService = fileService;
        this.dataSource = dataSource;
    }
    async execute(createResourceInfo) {
        const { resource, typeInfo, managers } = createResourceInfo;
        if (!resource.resourceGroupId) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.GROUP_ID_REQUIRED);
        }
        if (!managers || managers.length === 0) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.MANAGERS_REQUIRED);
        }
        const group = await this.resourceGroupService.findOne({
            where: { resourceGroupId: resource.resourceGroupId },
        });
        if (!group) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE_GROUP.NOT_FOUND);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: group.resourceGroupId,
                },
            });
            const resourceOrder = resources.length;
            if (!resource.images)
                resource.images = [];
            resource.images = resource.images.map((image) => this.fileService.getFileUrl(image));
            const savedResource = await this.resourceService.save({ ...resource, order: resourceOrder }, {
                queryRunner,
            });
            await this.fileService.updateTemporaryFiles(resource.images, false, { queryRunner });
            switch (group.type) {
                case resource_type_enum_1.ResourceType.VEHICLE:
                    await this.vehicleInfoService.save({ ...typeInfo, resourceId: savedResource.resourceId }, { queryRunner });
                    break;
                case resource_type_enum_1.ResourceType.MEETING_ROOM:
                    await this.meetingRoomInfoService.save({ ...typeInfo, resourceId: savedResource.resourceId }, { queryRunner });
                    break;
                case resource_type_enum_1.ResourceType.ACCOMMODATION:
                    await this.accommodationInfoService.save({ ...typeInfo, resourceId: savedResource.resourceId }, { queryRunner });
                    break;
                case resource_type_enum_1.ResourceType.EQUIPMENT:
                    await this.equipmentInfoService.save({ ...typeInfo, resourceId: savedResource.resourceId }, { queryRunner });
                    break;
            }
            await Promise.all([
                ...managers.map((manager) => {
                    return this.resourceManagerService.save({
                        resourceId: savedResource.resourceId,
                        employeeId: manager.employeeId,
                    }, { queryRunner });
                }),
            ]);
            await queryRunner.commitTransaction();
            const resourceWithTypeInfo = await this.resourceService.findOne({
                where: { resourceId: savedResource.resourceId },
                relations: ['vehicleInfo', 'meetingRoomInfo', 'accommodationInfo', 'equipmentInfo'],
            });
            return {
                resourceId: resourceWithTypeInfo.resourceId,
                type: resourceWithTypeInfo.type,
                typeInfoId: resourceWithTypeInfo.vehicleInfo?.vehicleInfoId ||
                    resourceWithTypeInfo.meetingRoomInfo?.meetingRoomInfoId ||
                    resourceWithTypeInfo.accommodationInfo?.accommodationInfoId ||
                    resourceWithTypeInfo.equipmentInfo?.equipmentInfoId,
            };
        }
        catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_CREATE);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.CreateResourceWithInfosUsecase = CreateResourceWithInfosUsecase;
exports.CreateResourceWithInfosUsecase = CreateResourceWithInfosUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_group_service_1.DomainResourceGroupService !== "undefined" && resource_group_service_1.DomainResourceGroupService) === "function" ? _b : Object, typeof (_c = typeof resource_manager_service_1.DomainResourceManagerService !== "undefined" && resource_manager_service_1.DomainResourceManagerService) === "function" ? _c : Object, typeof (_d = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _d : Object, typeof (_e = typeof meeting_room_info_service_1.DomainMeetingRoomInfoService !== "undefined" && meeting_room_info_service_1.DomainMeetingRoomInfoService) === "function" ? _e : Object, typeof (_f = typeof accommodation_info_service_1.DomainAccommodationInfoService !== "undefined" && accommodation_info_service_1.DomainAccommodationInfoService) === "function" ? _f : Object, typeof (_g = typeof equipment_info_service_1.DomainEquipmentInfoService !== "undefined" && equipment_info_service_1.DomainEquipmentInfoService) === "function" ? _g : Object, typeof (_h = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _h : Object, typeorm_1.DataSource])
], CreateResourceWithInfosUsecase);
//# sourceMappingURL=createResourceWithInfos.usecase.js.map