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
exports.SubmitDocumentRequestDto = exports.DraftContextDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class DraftContextDto {
}
exports.DraftContextDto = DraftContextDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안 부서 ID (선택사항 - 미입력시 직원의 주 소속 부서 자동 사용)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DraftContextDto.prototype, "drafterDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 금액 (향후 금액 기반 결재선 분기용)',
        example: 1000000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DraftContextDto.prototype, "documentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 유형 (향후 유형별 결재선 분기용)',
        example: 'BUDGET',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DraftContextDto.prototype, "documentType", void 0);
class SubmitDocumentRequestDto {
}
exports.SubmitDocumentRequestDto = SubmitDocumentRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안 컨텍스트 정보',
        type: DraftContextDto,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DraftContextDto),
    __metadata("design:type", DraftContextDto)
], SubmitDocumentRequestDto.prototype, "draftContext", void 0);
//# sourceMappingURL=submit-document-request.dto.js.map