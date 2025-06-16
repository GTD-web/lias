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
exports.UpdateResourceGroupOrdersDto = exports.NewOrderResourceGroupDto = exports.UpdateResourceOrdersDto = exports.NewOrderResourceDto = exports.UpdateResourceInfoDto = exports.UpdateResourceDto = exports.UpdateResourceGroupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const create_resource_dto_1 = require("./create-resource.dto");
const error_message_1 = require("@libs/constants/error-message");
class UpdateResourceGroupDto {
}
exports.UpdateResourceGroupDto = UpdateResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('제목') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) }),
    __metadata("design:type", String)
], UpdateResourceGroupDto.prototype, "title", void 0);
class UpdateResourceDto {
}
exports.UpdateResourceDto = UpdateResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 그룹 ID') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('이름') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('이름', 0, 100) }),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('설명') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('설명', 0, 100) }),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_resource_dto_1.ResourceLocation)
], UpdateResourceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_resource_dto_1.ResourceLocationURL)
], UpdateResourceDto.prototype, "locationURLs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('이미지') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateResourceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('사용 가능 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateResourceDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('사용 불가 사유') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('사용 불가 사유', 0, 100) }),
    __metadata("design:type", String)
], UpdateResourceDto.prototype, "unavailableReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('참가자 변경 알림 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateResourceDto.prototype, "notifyParticipantChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('예약 변경 알림 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateResourceDto.prototype, "notifyReservationChange", void 0);
class UpdateResourceInfoDto {
}
exports.UpdateResourceInfoDto = UpdateResourceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: UpdateResourceDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateResourceDto),
    __metadata("design:type", UpdateResourceDto)
], UpdateResourceInfoDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [create_resource_dto_1.CreateResourceManagerDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('관리자') }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_resource_dto_1.CreateResourceManagerDto),
    __metadata("design:type", Array)
], UpdateResourceInfoDto.prototype, "managers", void 0);
class NewOrderResourceDto {
}
exports.NewOrderResourceDto = NewOrderResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 ID') }),
    __metadata("design:type", String)
], NewOrderResourceDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({}, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_NUMBER('순서') }),
    __metadata("design:type", Number)
], NewOrderResourceDto.prototype, "newOrder", void 0);
class UpdateResourceOrdersDto {
}
exports.UpdateResourceOrdersDto = UpdateResourceOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [NewOrderResourceDto] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('순서 목록') }),
    __metadata("design:type", Array)
], UpdateResourceOrdersDto.prototype, "orders", void 0);
class NewOrderResourceGroupDto {
}
exports.NewOrderResourceGroupDto = NewOrderResourceGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 그룹 ID') }),
    __metadata("design:type", String)
], NewOrderResourceGroupDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({}, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_NUMBER('순서') }),
    __metadata("design:type", Number)
], NewOrderResourceGroupDto.prototype, "newOrder", void 0);
class UpdateResourceGroupOrdersDto {
}
exports.UpdateResourceGroupOrdersDto = UpdateResourceGroupOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [NewOrderResourceGroupDto] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('순서 목록') }),
    __metadata("design:type", Array)
], UpdateResourceGroupOrdersDto.prototype, "orders", void 0);
//# sourceMappingURL=update-resource.dto.js.map