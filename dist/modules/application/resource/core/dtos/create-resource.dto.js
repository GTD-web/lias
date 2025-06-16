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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResourceInfoDto = exports.CreateResourceDto = exports.ResourceLocationURL = exports.ResourceLocation = exports.CreateResourceManagerDto = exports.CreateResourceGroupDto = void 0;
const class_validator_1 = require("class-validator");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const create_vehicle_info_dto_1 = require("@src/application/resource/vehicle/dtos/create-vehicle-info.dto");
const create_meeting_room_info_dto_1 = require("@src/application/resource/meeting-room/dtos/create-meeting-room-info.dto");
const create_accommodation_info_dto_1 = require("@src/application/resource/accommodation/dtos/create-accommodation-info.dto");
const create_equipment_info_dto_1 = require("@src/application/resource/equipment/dtos/create-equipment-info.dto");
const error_message_1 = require("@libs/constants/error-message");
class CreateResourceGroupDto {
}
exports.CreateResourceGroupDto = CreateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('상위 자원 그룹 ID') }),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "parentResourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ENUM('자원 타입', Object.values(resource_type_enum_1.ResourceType)) }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateResourceGroupDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('제목') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) }),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('설명') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('설명', 0, 100) }),
    __metadata("design:type", String)
], CreateResourceGroupDto.prototype, "description", void 0);
class CreateResourceManagerDto {
}
exports.CreateResourceManagerDto = CreateResourceManagerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('직원 ID') }),
    __metadata("design:type", String)
], CreateResourceManagerDto.prototype, "employeeId", void 0);
class ResourceLocation {
}
exports.ResourceLocation = ResourceLocation;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('주소') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('주소', 0, 100) }),
    __metadata("design:type", String)
], ResourceLocation.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('상세 주소') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('상세 주소', 0, 100) }),
    __metadata("design:type", String)
], ResourceLocation.prototype, "detailAddress", void 0);
class ResourceLocationURL {
}
exports.ResourceLocationURL = ResourceLocationURL;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('Tmap URL') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceLocationURL.prototype, "tmap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('Navermap URL') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceLocationURL.prototype, "navermap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('Kakaomap URL') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceLocationURL.prototype, "kakaomap", void 0);
class CreateResourceDto {
}
exports.CreateResourceDto = CreateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 그룹 ID') }),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('이름') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('이름', 0, 100) }),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('설명') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('설명', 0, 100) }),
    __metadata("design:type", String)
], CreateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResourceLocation }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ResourceLocation)
], CreateResourceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResourceLocationURL }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ResourceLocationURL)
], CreateResourceDto.prototype, "locationURLs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('이미지') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateResourceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('참가자 변경 알림 여부') }),
    __metadata("design:type", Boolean)
], CreateResourceDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('예약 변경 알림 여부') }),
    __metadata("design:type", Boolean)
], CreateResourceDto.prototype, "notifyReservationChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ENUM('자원 타입', Object.values(resource_type_enum_1.ResourceType)) }),
    __metadata("design:type", typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object)
], CreateResourceDto.prototype, "type", void 0);
class CreateResourceInfoDto {
}
exports.CreateResourceInfoDto = CreateResourceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateResourceDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateResourceDto),
    __metadata("design:type", CreateResourceDto)
], CreateResourceInfoDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_vehicle_info_dto_1.CreateVehicleInfoDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_meeting_room_info_dto_1.CreateMeetingRoomInfoDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_accommodation_info_dto_1.CreateAccommodationInfoDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_equipment_info_dto_1.CreateEquipmentInfoDto) },
        ],
    }),
    __metadata("design:type", Object)
], CreateResourceInfoDto.prototype, "typeInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateResourceManagerDto] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('관리자') }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateResourceManagerDto),
    __metadata("design:type", Array)
], CreateResourceInfoDto.prototype, "managers", void 0);
//# sourceMappingURL=create-resource.dto.js.map