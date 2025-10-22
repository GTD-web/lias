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
exports.PreviewApprovalLineRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PreviewApprovalLineRequestDto {
}
exports.PreviewApprovalLineRequestDto = PreviewApprovalLineRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서양식 버전 ID',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PreviewApprovalLineRequestDto.prototype, "formVersionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안 부서 ID (선택사항 - 미입력시 직원의 주 소속 부서 자동 사용)',
        example: '123e4567-e89b-12d3-a456-426614174002',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PreviewApprovalLineRequestDto.prototype, "drafterDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 금액 (금액 기반 결재선용)',
        example: 1000000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PreviewApprovalLineRequestDto.prototype, "documentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 유형',
        example: 'BUDGET',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreviewApprovalLineRequestDto.prototype, "documentType", void 0);
//# sourceMappingURL=preview-approval-line-request.dto.js.map