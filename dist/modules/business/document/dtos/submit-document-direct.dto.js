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
exports.SubmitDocumentDirectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SubmitDocumentDirectDto {
}
exports.SubmitDocumentDirectDto = SubmitDocumentDirectDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 ID (선택사항: 템플릿 없는 외부 문서 지원)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmitDocumentDirectDto.prototype, "documentTemplateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '휴가 신청서',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitDocumentDirectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 내용 (HTML 형태)',
        example: '<html>...</html>',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitDocumentDirectDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '추가 메타데이터 (금액, 날짜 등)',
        example: { amount: 100000, date: '2025-01-01' },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SubmitDocumentDirectDto.prototype, "metadata", void 0);
//# sourceMappingURL=submit-document-direct.dto.js.map