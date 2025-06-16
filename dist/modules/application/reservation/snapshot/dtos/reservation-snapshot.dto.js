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
exports.ReservationSnapshotResponseDto = exports.SelectedResourceResponseDto = exports.TimeRangeResponseDto = exports.TimeInfoResponseDto = exports.DateRangeResponseDto = exports.UpdateReservationSnapshotDto = exports.CreateReservationSnapshotDto = exports.ReminderTimeDto = exports.SelectedResourceDto = exports.TimeRangeDto = exports.TimeInfoDto = exports.DateRangeDto = exports.DroppableGroupDataDto = exports.DroppableGroupItemDto = exports.AttendeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AttendeeDto {
}
exports.AttendeeDto = AttendeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendeeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendeeDto.prototype, "department", void 0);
class DroppableGroupItemDto {
}
exports.DroppableGroupItemDto = DroppableGroupItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DroppableGroupItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DroppableGroupItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DroppableGroupItemDto.prototype, "order", void 0);
class DroppableGroupDataDto {
}
exports.DroppableGroupDataDto = DroppableGroupDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DroppableGroupDataDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DroppableGroupDataDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DroppableGroupItemDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DroppableGroupDataDto.prototype, "items", void 0);
class DateRangeDto {
}
exports.DateRangeDto = DateRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "to", void 0);
class TimeInfoDto {
}
exports.TimeInfoDto = TimeInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TimeInfoDto.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TimeInfoDto.prototype, "minute", void 0);
class TimeRangeDto {
}
exports.TimeRangeDto = TimeRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TimeRangeDto.prototype, "am", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TimeRangeDto.prototype, "pm", void 0);
class SelectedResourceDto {
}
exports.SelectedResourceDto = SelectedResourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SelectedResourceDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SelectedResourceDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SelectedResourceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SelectedResourceDto.prototype, "endDate", void 0);
class ReminderTimeDto {
}
exports.ReminderTimeDto = ReminderTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReminderTimeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReminderTimeDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ReminderTimeDto.prototype, "isSelected", void 0);
class CreateReservationSnapshotDto {
}
exports.CreateReservationSnapshotDto = CreateReservationSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['groups', 'date-time', 'resources', 'info'], required: false }),
    (0, class_validator_1.IsEnum)(['groups', 'date-time', 'resources', 'info']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReservationSnapshotDto.prototype, "step", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReservationSnapshotDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: DroppableGroupDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DroppableGroupDataDto)
], CreateReservationSnapshotDto.prototype, "droppableGroupData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: DateRangeDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], CreateReservationSnapshotDto.prototype, "dateRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeInfoDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TimeInfoDto),
    __metadata("design:type", TimeInfoDto)
], CreateReservationSnapshotDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeInfoDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TimeInfoDto),
    __metadata("design:type", TimeInfoDto)
], CreateReservationSnapshotDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeRangeDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TimeRangeDto),
    __metadata("design:type", TimeRangeDto)
], CreateReservationSnapshotDto.prototype, "timeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReservationSnapshotDto.prototype, "timeUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SelectedResourceDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SelectedResourceDto),
    __metadata("design:type", SelectedResourceDto)
], CreateReservationSnapshotDto.prototype, "selectedResource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationSnapshotDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [ReminderTimeDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateReservationSnapshotDto.prototype, "reminderTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReservationSnapshotDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReservationSnapshotDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateReservationSnapshotDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AttendeeDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateReservationSnapshotDto.prototype, "attendees", void 0);
class UpdateReservationSnapshotDto extends CreateReservationSnapshotDto {
}
exports.UpdateReservationSnapshotDto = UpdateReservationSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateReservationSnapshotDto.prototype, "snapshotId", void 0);
class DateRangeResponseDto {
}
exports.DateRangeResponseDto = DateRangeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], DateRangeResponseDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], DateRangeResponseDto.prototype, "to", void 0);
class TimeInfoResponseDto {
}
exports.TimeInfoResponseDto = TimeInfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], TimeInfoResponseDto.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], TimeInfoResponseDto.prototype, "minute", void 0);
class TimeRangeResponseDto {
}
exports.TimeRangeResponseDto = TimeRangeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], TimeRangeResponseDto.prototype, "am", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], TimeRangeResponseDto.prototype, "pm", void 0);
class SelectedResourceResponseDto {
}
exports.SelectedResourceResponseDto = SelectedResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SelectedResourceResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SelectedResourceResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], SelectedResourceResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], SelectedResourceResponseDto.prototype, "endDate", void 0);
class ReservationSnapshotResponseDto {
}
exports.ReservationSnapshotResponseDto = ReservationSnapshotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationSnapshotResponseDto.prototype, "snapshotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationSnapshotResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['groups', 'date-time', 'resources', 'info'], required: false }),
    __metadata("design:type", String)
], ReservationSnapshotResponseDto.prototype, "step", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationSnapshotResponseDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: DroppableGroupDataDto }),
    __metadata("design:type", DroppableGroupDataDto)
], ReservationSnapshotResponseDto.prototype, "droppableGroupData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: DateRangeResponseDto }),
    __metadata("design:type", DateRangeResponseDto)
], ReservationSnapshotResponseDto.prototype, "dateRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeInfoResponseDto }),
    __metadata("design:type", TimeInfoResponseDto)
], ReservationSnapshotResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeInfoResponseDto }),
    __metadata("design:type", TimeInfoResponseDto)
], ReservationSnapshotResponseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: TimeRangeResponseDto }),
    __metadata("design:type", TimeRangeResponseDto)
], ReservationSnapshotResponseDto.prototype, "timeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ReservationSnapshotResponseDto.prototype, "timeUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SelectedResourceResponseDto }),
    __metadata("design:type", SelectedResourceResponseDto)
], ReservationSnapshotResponseDto.prototype, "selectedResource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationSnapshotResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [ReminderTimeDto] }),
    __metadata("design:type", Array)
], ReservationSnapshotResponseDto.prototype, "reminderTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationSnapshotResponseDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationSnapshotResponseDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number] }),
    __metadata("design:type", Array)
], ReservationSnapshotResponseDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AttendeeDto] }),
    __metadata("design:type", Array)
], ReservationSnapshotResponseDto.prototype, "attendees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationSnapshotResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationSnapshotResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=reservation-snapshot.dto.js.map