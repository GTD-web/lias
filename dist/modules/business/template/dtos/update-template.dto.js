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
exports.UpdateTemplateDto = exports.UpdateApprovalStepTemplateItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_template_dto_1 = require("./create-template.dto");
class UpdateApprovalStepTemplateItemDto extends create_template_dto_1.ApprovalStepTemplateItemDto {
}
exports.UpdateApprovalStepTemplateItemDto = UpdateApprovalStepTemplateItemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재단계 템플릿 ID (수정 시 필요, 없으면 새로 생성)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateApprovalStepTemplateItemDto.prototype, "id", void 0);
class UpdateTemplateDto {
}
exports.UpdateTemplateDto = UpdateTemplateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID (null로 설정하면 카테고리 제거)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재단계 템플릿 목록 (id가 있으면 수정, 없으면 생성, 기존 것 중 요청에 없는 것은 삭제)',
        type: [UpdateApprovalStepTemplateItemDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateApprovalStepTemplateItemDto),
    __metadata("design:type", Array)
], UpdateTemplateDto.prototype, "approvalSteps", void 0);
//# sourceMappingURL=update-template.dto.js.map