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
exports.SendNotificationResponseDto = exports.SendNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SendNotificationDto {
}
exports.SendNotificationDto = SendNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '발신자 ID (사번)',
        example: 'E2023001',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '알림 제목',
        example: '새로운 공지사항이 등록되었습니다',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '알림 내용',
        example: '인사팀에서 새로운 공지사항을 등록했습니다.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수신자 사용자 ID 목록 (사번), 최대 500개',
        example: ['E2023002', 'E2023003', 'E2023004'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(500),
    __metadata("design:type", Array)
], SendNotificationDto.prototype, "recipientIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수신자 FCM 토큰 목록, recipientIds와 순서 일치해야 함',
        example: ['fcm_token_1', 'fcm_token_2', 'fcm_token_3'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(500),
    __metadata("design:type", Array)
], SendNotificationDto.prototype, "tokens", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '소스 시스템',
        example: 'portal',
        default: 'portal',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "sourceSystem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '알림 클릭 시 이동할 URL',
        example: '/portal/announcements/123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "linkUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '추가 메타데이터 (JSON)',
        example: { type: 'announcement', priority: 'high' },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SendNotificationDto.prototype, "metadata", void 0);
class SendNotificationResponseDto {
}
exports.SendNotificationResponseDto = SendNotificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '성공 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], SendNotificationResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 메시지',
        example: '알림 전송 완료: 성공 3건, 실패 0건',
    }),
    __metadata("design:type", String)
], SendNotificationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성된 알림 ID 목록',
        example: ['22e6acc2-03be-4d69-a691-1b5c4e15e119', '33f7bdd3-14cf-5d7a-b802-2c6d5f26f22a'],
        type: [String],
    }),
    __metadata("design:type", Array)
], SendNotificationResponseDto.prototype, "notificationIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '성공 건수',
        example: 3,
    }),
    __metadata("design:type", Number)
], SendNotificationResponseDto.prototype, "successCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '실패 건수',
        example: 0,
    }),
    __metadata("design:type", Number)
], SendNotificationResponseDto.prototype, "failureCount", void 0);
//# sourceMappingURL=send-notification.dto.js.map