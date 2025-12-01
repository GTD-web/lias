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
exports.CreateTemplateDto = exports.ApprovalStepTemplateItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class ApprovalStepTemplateItemDto {
}
exports.ApprovalStepTemplateItemDto = ApprovalStepTemplateItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ApprovalStepTemplateItemDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], ApprovalStepTemplateItemDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할당 규칙',
        enum: approval_enum_1.AssigneeRule,
        example: approval_enum_1.AssigneeRule.FIXED,
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.AssigneeRule),
    __metadata("design:type", String)
], ApprovalStepTemplateItemDto.prototype, "assigneeRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직원 ID (FIXED 규칙인 경우)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApprovalStepTemplateItemDto.prototype, "targetEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 부서 ID (DEPARTMENT_REFERENCE 규칙인 경우)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApprovalStepTemplateItemDto.prototype, "targetDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직책 ID (HIERARCHY_TO_POSITION 규칙인 경우)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApprovalStepTemplateItemDto.prototype, "targetPositionId", void 0);
class CreateTemplateDto {
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 코드',
        example: 'VAC',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ApprovalStepTemplateItemDto),
    __metadata("design:type", Array)
], CreateTemplateDto.prototype, "approvalSteps", void 0);
//# sourceMappingURL=create-template.dto.js.map