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
exports.CompleteImplementationRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CompleteImplementationRequestDto {
}
exports.CompleteImplementationRequestDto = CompleteImplementationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행 단계 스냅샷 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CompleteImplementationRequestDto.prototype, "stepSnapshotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행 결과 메모',
        example: '예산 집행 완료했습니다',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteImplementationRequestDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행 결과 데이터 (JSON)',
        example: { executionDate: '2025-01-15', amount: 1000000 },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CompleteImplementationRequestDto.prototype, "resultData", void 0);
//# sourceMappingURL=complete-implementation-request.dto.js.map