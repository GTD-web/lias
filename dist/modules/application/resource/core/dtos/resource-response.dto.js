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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGroupWithResourcesAndReservationsResponseDto = exports.ResourceGroupWithResourcesResponseDto = exports.ChildResourceGroupResponseDto = exports.ResourceWithReservationsResponseDto = exports.ResourceSelectResponseDto = exports.ResourceResponseDto = exports.ResourceGroupResponseDto = exports.ResourceManagerResponseDto = exports.CreateResourceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const vehicle_response_dto_1 = require("@src/application/resource/vehicle/dtos/vehicle-response.dto");
const meeting_room_info_response_dto_1 = require("@src/application/resource/meeting-room/dtos/meeting-room-info-response.dto");
const accommodation_info_response_dto_1 = require("@src/application/resource/accommodation/dtos/accommodation-info-response.dto");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const create_resource_dto_1 = require("./create-resource.dto");
const reservation_response_dto_1 = require("@src/application/reservation/core/dtos/reservation-response.dto");
const employee_response_dto_1 = require("@src/application/employee/dtos/employee-response.dto");
const file_response_dto_1 = require("@src/application/file/dtos/file-response.dto");
const equipment_info_response_dto_1 = require("@src/application/resource/equipment/dtos/equipment-info-response.dto");
class CreateResourceResponseDto {
}
exports.CreateResourceResponseDto = CreateResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateResourceResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateResourceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateResourceResponseDto.prototype, "typeInfoId", void 0);
class ResourceManagerResponseDto {
}
exports.ResourceManagerResponseDto = ResourceManagerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "resourceManagerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceManagerResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof employee_response_dto_1.EmployeeResponseDto !== "undefined" && employee_response_dto_1.EmployeeResponseDto) === "function" ? _b : Object)
], ResourceManagerResponseDto.prototype, "employee", void 0);
class ResourceGroupResponseDto {
}
exports.ResourceGroupResponseDto = ResourceGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object)
], ResourceGroupResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceGroupResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceGroupResponseDto.prototype, "parentResourceGroupId", void 0);
class ResourceResponseDto {
    constructor(resource) {
        this.resourceId = resource?.resourceId;
        this.resourceGroupId = resource?.resourceGroupId;
        this.name = resource?.name;
        this.description = resource?.description;
        this.location = resource?.location;
        this.locationURLs = resource?.locationURLs;
        this.images = resource?.images;
        this.type = resource?.type;
        this.isAvailable = resource?.isAvailable;
        this.unavailableReason = resource?.unavailableReason;
        this.notifyParticipantChange = resource?.notifyParticipantChange;
        this.notifyReservationChange = resource?.notifyReservationChange;
        this.order = resource?.order;
        this.managers = resource?.resourceManagers;
        this.resourceGroup = resource?.resourceGroup;
        this.imageFiles = resource?.images ? resource['imageFiles'] : [];
        if (resource?.vehicleInfo) {
            this.typeInfo = resource.vehicleInfo;
        }
        else if (resource?.meetingRoomInfo) {
            this.typeInfo = resource.meetingRoomInfo;
        }
        else if (resource?.accommodationInfo) {
            this.typeInfo = resource.accommodationInfo;
        }
        else if (resource?.equipmentInfo) {
            this.typeInfo = resource.equipmentInfo;
        }
    }
}
exports.ResourceResponseDto = ResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: create_resource_dto_1.ResourceLocation }),
    __metadata("design:type", create_resource_dto_1.ResourceLocation)
], ResourceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: create_resource_dto_1.ResourceLocationURL }),
    __metadata("design:type", create_resource_dto_1.ResourceLocationURL)
], ResourceResponseDto.prototype, "locationURLs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [file_response_dto_1.FileResponseDto] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "imageFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_d = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _d : Object)
], ResourceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "unavailableReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(vehicle_response_dto_1.VehicleInfoResponseDto) },
            { $ref: (0, swagger_1.getSchemaPath)(meeting_room_info_response_dto_1.MeetingRoomInfoResponseDto) },
            { $ref: (0, swagger_1.getSchemaPath)(accommodation_info_response_dto_1.AccommodationInfoResponseDto) },
            { $ref: (0, swagger_1.getSchemaPath)(equipment_info_response_dto_1.EquipmentInfoResponseDto) },
        ],
    }),
    __metadata("design:type", Object)
], ResourceResponseDto.prototype, "typeInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [ResourceManagerResponseDto] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "managers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", ResourceGroupResponseDto)
], ResourceResponseDto.prototype, "resourceGroup", void 0);
class ResourceSelectResponseDto {
}
exports.ResourceSelectResponseDto = ResourceSelectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], ResourceSelectResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResourceSelectResponseDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "unavailableReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResourceSelectResponseDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResourceSelectResponseDto.prototype, "order", void 0);
class ResourceWithReservationsResponseDto extends ResourceResponseDto {
    constructor(resource) {
        super(resource);
        this.reservations = resource?.reservations.map((reservation) => new reservation_response_dto_1.ReservationResponseDto(reservation));
    }
}
exports.ResourceWithReservationsResponseDto = ResourceWithReservationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [reservation_response_dto_1.ReservationResponseDto] }),
    __metadata("design:type", Array)
], ResourceWithReservationsResponseDto.prototype, "reservations", void 0);
class ChildResourceGroupResponseDto extends ResourceGroupResponseDto {
}
exports.ChildResourceGroupResponseDto = ChildResourceGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ResourceSelectResponseDto, required: false }),
    __metadata("design:type", Array)
], ChildResourceGroupResponseDto.prototype, "resources", void 0);
class ResourceGroupWithResourcesResponseDto extends ResourceGroupResponseDto {
}
exports.ResourceGroupWithResourcesResponseDto = ResourceGroupWithResourcesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ChildResourceGroupResponseDto],
        required: false,
    }),
    __metadata("design:type", Array)
], ResourceGroupWithResourcesResponseDto.prototype, "children", void 0);
class ResourceGroupWithResourcesAndReservationsResponseDto extends ResourceGroupResponseDto {
}
exports.ResourceGroupWithResourcesAndReservationsResponseDto = ResourceGroupWithResourcesAndReservationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ResourceWithReservationsResponseDto],
        required: false,
    }),
    __metadata("design:type", Array)
], ResourceGroupWithResourcesAndReservationsResponseDto.prototype, "resources", void 0);
//# sourceMappingURL=resource-response.dto.js.map