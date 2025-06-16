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
exports.ResourceAvailabilityDto = exports.TimeSlotDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TimeSlotDto {
}
exports.TimeSlotDto = TimeSlotDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시작 시간 (ISO 문자열)',
        example: '2025-01-01T09:00:00',
    }),
    __metadata("design:type", String)
], TimeSlotDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '종료 시간 (ISO 문자열)',
        example: '2025-01-01T10:00:00',
    }),
    __metadata("design:type", String)
], TimeSlotDto.prototype, "endTime", void 0);
class ResourceAvailabilityDto {
}
exports.ResourceAvailabilityDto = ResourceAvailabilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '자원 ID',
        example: '78117aaf-a203-43a3-bb38-51ec91ca935a',
    }),
    __metadata("design:type", String)
], ResourceAvailabilityDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '자원 이름',
        example: '회의실 A',
    }),
    __metadata("design:type", String)
], ResourceAvailabilityDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '자원 위치',
        example: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 3층',
    }),
    __metadata("design:type", String)
], ResourceAvailabilityDto.prototype, "resourceLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '가용 시간 슬롯 목록',
        type: [TimeSlotDto],
    }),
    __metadata("design:type", Array)
], ResourceAvailabilityDto.prototype, "availableTimeSlots", void 0);
//# sourceMappingURL=available-time-response.dto.js.map