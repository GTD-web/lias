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
exports.GenerateTokenResponseDto = exports.GenerateTokenRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GenerateTokenRequestDto {
}
exports.GenerateTokenRequestDto = GenerateTokenRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원 번호',
        example: '20230001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateTokenRequestDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        example: 'user@company.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GenerateTokenRequestDto.prototype, "email", void 0);
class GenerateTokenResponseDto {
}
exports.GenerateTokenResponseDto = GenerateTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 여부' }),
    __metadata("design:type", Boolean)
], GenerateTokenResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '메시지' }),
    __metadata("design:type", String)
], GenerateTokenResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT 액세스 토큰' }),
    __metadata("design:type", String)
], GenerateTokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '토큰 만료 시간 (초)' }),
    __metadata("design:type", Number)
], GenerateTokenResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 정보', required: false }),
    __metadata("design:type", Object)
], GenerateTokenResponseDto.prototype, "employee", void 0);
//# sourceMappingURL=generate-token-request.dto.js.map