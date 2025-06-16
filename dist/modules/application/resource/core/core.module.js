"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const accommodation_info_module_1 = require("@src/domain/accommodation-info/accommodation-info.module");
const meeting_room_info_module_1 = require("@src/domain/meeting-room-info/meeting-room-info.module");
const resource_group_module_1 = require("@src/domain/resource-group/resource-group.module");
const resource_manager_module_1 = require("@src/domain/resource-manager/resource-manager.module");
const resource_module_1 = require("@src/domain/resource/resource.module");
const vehicle_info_module_1 = require("@src/domain/vehicle-info/vehicle-info.module");
const equipment_info_module_1 = require("@src/domain/equipment-info/equipment-info.module");
const file_module_1 = require("@src/domain/file/file.module");
const reservation_module_1 = require("@src/domain/reservation/reservation.module");
const consumable_module_1 = require("@src/domain/consumable/consumable.module");
const maintenance_module_1 = require("@src/domain/maintenance/maintenance.module");
const resource_group_controller_1 = require("./controllers/resource-group.controller");
const resource_controller_1 = require("./controllers/resource.controller");
const admin_resource_controller_1 = require("./controllers/admin.resource.controller");
const admin_resource_group_controller_1 = require("./controllers/admin.resource-group.controller");
const resource_service_1 = require("./services/resource.service");
const resource_group_service_1 = require("./services/resource-group.service");
const resource_1 = require("./usecases/resource");
const resource_group_1 = require("./usecases/resource-group");
let ResourceCoreModule = class ResourceCoreModule {
};
exports.ResourceCoreModule = ResourceCoreModule;
exports.ResourceCoreModule = ResourceCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Resource,
                entities_1.ResourceGroup,
                entities_1.ResourceManager,
                entities_1.VehicleInfo,
                entities_1.Consumable,
                entities_1.Maintenance,
                entities_1.MeetingRoomInfo,
                entities_1.AccommodationInfo,
                entities_1.EquipmentInfo,
                entities_1.File,
                entities_1.Reservation,
            ]),
            resource_module_1.DomainResourceModule,
            resource_group_module_1.DomainResourceGroupModule,
            resource_manager_module_1.DomainResourceManagerModule,
            vehicle_info_module_1.DomainVehicleInfoModule,
            consumable_module_1.DomainConsumableModule,
            maintenance_module_1.DomainMaintenanceModule,
            meeting_room_info_module_1.DomainMeetingRoomInfoModule,
            accommodation_info_module_1.DomainAccommodationInfoModule,
            equipment_info_module_1.DomainEquipmentInfoModule,
            file_module_1.DomainFileModule,
            reservation_module_1.DomainReservationModule,
        ],
        controllers: [
            admin_resource_controller_1.AdminResourceController,
            admin_resource_group_controller_1.AdminResourceGroupController,
            resource_group_controller_1.UserResourceGroupController,
            resource_controller_1.UserResourceController,
        ],
        providers: [
            resource_service_1.ResourceService,
            resource_group_service_1.ResourceGroupService,
            resource_1.FindResourcesUsecase,
            resource_1.FindResourceDetailUsecase,
            resource_1.CheckAvailabilityUsecase,
            resource_1.CreateResourceWithInfosUsecase,
            resource_1.UpdateResourceUsecase,
            resource_1.ReorderResourcesUsecase,
            resource_1.DeleteResourceUsecase,
            resource_1.FindAvailableTimeUsecase,
            resource_1.FindResourcesByTypeAndDateWithReservationsUsecase,
            resource_group_1.FindParentResourceGroupsUsecase,
            resource_group_1.FindResourceGroupsWithResourceDataUsecase,
            resource_group_1.CreateResourceGroupUsecase,
            resource_group_1.UpdateResourceGroupUsecase,
            resource_group_1.ReorderResourceGroupsUsecase,
            resource_group_1.DeleteResourceGroupUsecase,
        ],
    })
], ResourceCoreModule);
//# sourceMappingURL=core.module.js.map