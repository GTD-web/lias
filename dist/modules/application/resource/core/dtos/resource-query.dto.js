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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const paginate_query_dto_1 = require("@libs/dtos/paginate-query.dto");
class ResourceQueryDto extends paginate_query_dto_1.PaginationQueryDto {
}
exports.ResourceQueryDto = ResourceQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리소스 타입',
        enum: resource_type_enum_1.ResourceType,
        example: resource_type_enum_1.ResourceType.MEETING_ROOM,
    }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], ResourceQueryDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리소스 그룹 ID',
        example: 'ca33f67a-a9c2-4a29-b266-3d82f9aa7fe4',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "resourceGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '예약 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시작 날짜',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '종료 날짜',
        example: '2024-01-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시작 시간',
        example: '09:00:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '종료 시간',
        example: '18:00:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceQueryDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '오전 시간대 필터',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], ResourceQueryDto.prototype, "am", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '오후 시간대 필터',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], ResourceQueryDto.prototype, "pm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이용 시간 단위(분)',
        example: 30,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ResourceQueryDto.prototype, "timeUnit", void 0);
//# sourceMappingURL=resource-query.dto.js.map