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
exports.CloneTemplateRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_form_request_dto_1 = require("./create-form-request.dto");
class CloneTemplateRequestDto {
}
exports.CloneTemplateRequestDto = CloneTemplateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '복제할 기준 결재선 템플릿 버전 ID', example: 'template-version-123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CloneTemplateRequestDto.prototype, "baseTemplateVersionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '새 템플릿 이름 (없으면 원본 템플릿에 새 버전 추가)',
        example: '지출결의 전용 결재선',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CloneTemplateRequestDto.prototype, "newTemplateName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '단계 수정 정보', type: [create_form_request_dto_1.StepEditRequestDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_form_request_dto_1.StepEditRequestDto),
    __metadata("design:type", Array)
], CloneTemplateRequestDto.prototype, "stepEdits", void 0);
//# sourceMappingURL=clone-template-request.dto.js.map