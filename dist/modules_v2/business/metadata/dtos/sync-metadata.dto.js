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
exports.SyncMetadataResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SyncMetadataResponseDto {
}
exports.SyncMetadataResponseDto = SyncMetadataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 여부' }),
    __metadata("design:type", Boolean)
], SyncMetadataResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '메시지' }),
    __metadata("design:type", String)
], SyncMetadataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '동기화된 데이터 개수' }),
    __metadata("design:type", Object)
], SyncMetadataResponseDto.prototype, "syncedCounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '동기화 완료 시각' }),
    __metadata("design:type", Date)
], SyncMetadataResponseDto.prototype, "syncedAt", void 0);
//# sourceMappingURL=sync-metadata.dto.js.map