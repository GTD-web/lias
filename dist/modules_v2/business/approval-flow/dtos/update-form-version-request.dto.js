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
exports.UpdateFormVersionRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_form_request_dto_1 = require("./create-form-request.dto");
class UpdateFormVersionRequestDto {
}
exports.UpdateFormVersionRequestDto = UpdateFormVersionRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서양식 ID (검증용, 선택사항)', example: 'form-123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFormVersionRequestDto.prototype, "formId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '버전 변경 사유', example: '결재선 수정' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFormVersionRequestDto.prototype, "versionNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서양식 템플릿 (HTML)', example: '<h1>제목</h1><p>내용</p>' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFormVersionRequestDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재선 템플릿 버전 ID (결재선 변경 시)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFormVersionRequestDto.prototype, "lineTemplateVersionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '복제 후 수정 여부', example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFormVersionRequestDto.prototype, "cloneAndEdit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '복제할 기준 결재선 템플릿 버전 ID (cloneAndEdit=true 시)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFormVersionRequestDto.prototype, "baseLineTemplateVersionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '단계 수정 정보 (cloneAndEdit=true 시 사용)', type: [create_form_request_dto_1.StepEditRequestDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_form_request_dto_1.StepEditRequestDto),
    __metadata("design:type", Array)
], UpdateFormVersionRequestDto.prototype, "stepEdits", void 0);
//# sourceMappingURL=update-form-version-request.dto.js.map