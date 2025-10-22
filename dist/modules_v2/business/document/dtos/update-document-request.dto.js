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
exports.UpdateDocumentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateDocumentRequestDto {
}
exports.UpdateDocumentRequestDto = UpdateDocumentRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '2025년 1분기 예산안 (수정)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentRequestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 내용 (HTML 또는 문자열)',
        example: '<p>수정된 예산안 내용</p>',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentRequestDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '메타데이터 (JSON)',
        example: { urgency: 'medium' },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateDocumentRequestDto.prototype, "metadata", void 0);
//# sourceMappingURL=update-document-request.dto.js.map