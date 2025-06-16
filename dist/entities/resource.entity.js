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
exports.Resource = void 0;
const typeorm_1 = require("typeorm");
const resource_group_entity_1 = require("./resource-group.entity");
const vehicle_info_entity_1 = require("./vehicle-info.entity");
const meeting_room_info_entity_1 = require("./meeting-room-info.entity");
const accommodation_info_entity_1 = require("./accommodation-info.entity");
const reservation_entity_1 = require("./reservation.entity");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const resource_manager_entity_1 = require("./resource-manager.entity");
const equipment_info_entity_1 = require("./equipment-info.entity");
let Resource = class Resource {
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Resource.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "resourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Resource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "locationURLs", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "unavailableReason", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], Resource.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: resource_type_enum_1.ResourceType }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], Resource.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resource.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Resource.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_group_entity_1.ResourceGroup),
    (0, typeorm_1.JoinColumn)({ name: 'resourceGroupId' }),
    __metadata("design:type", resource_group_entity_1.ResourceGroup)
], Resource.prototype, "resourceGroup", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehicle_info_entity_1.VehicleInfo, (vehicleInfo) => vehicleInfo.resource),
    __metadata("design:type", vehicle_info_entity_1.VehicleInfo)
], Resource.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => meeting_room_info_entity_1.MeetingRoomInfo, (meetingRoomInfo) => meetingRoomInfo.resource),
    __metadata("design:type", meeting_room_info_entity_1.MeetingRoomInfo)
], Resource.prototype, "meetingRoomInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accommodation_info_entity_1.AccommodationInfo, (accommodationInfo) => accommodationInfo.resource),
    __metadata("design:type", typeof (_b = typeof accommodation_info_entity_1.AccommodationInfo !== "undefined" && accommodation_info_entity_1.AccommodationInfo) === "function" ? _b : Object)
], Resource.prototype, "accommodationInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipment_info_entity_1.EquipmentInfo, (equipmentInfo) => equipmentInfo.resource),
    __metadata("design:type", typeof (_c = typeof equipment_info_entity_1.EquipmentInfo !== "undefined" && equipment_info_entity_1.EquipmentInfo) === "function" ? _c : Object)
], Resource.prototype, "equipmentInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.resource),
    __metadata("design:type", Array)
], Resource.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_manager_entity_1.ResourceManager, (resourceManager) => resourceManager.resource),
    __metadata("design:type", Array)
], Resource.prototype, "resourceManagers", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)('resources')
], Resource);
//# sourceMappingURL=resource.entity.js.map