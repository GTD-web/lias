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
exports.CreateApprovalLineTemplateRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_form_request_dto_1 = require("./create-form-request.dto");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class CreateApprovalLineTemplateRequestDto {
}
exports.CreateApprovalLineTemplateRequestDto = CreateApprovalLineTemplateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 이름', example: '일반 결재선' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalLineTemplateRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재선 템플릿 설명', example: '부서 내 일반적인 결재 프로세스' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalLineTemplateRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 유형 (COMMON: 공통, DEDICATED: 전용)',
        example: 'COMMON',
        enum: approval_enum_1.ApprovalLineType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalLineType),
    __metadata("design:type", String)
], CreateApprovalLineTemplateRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '조직 범위 (COMPANY: 전사, DEPARTMENT: 부서별)',
        example: 'COMPANY',
        enum: approval_enum_1.DepartmentScopeType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.DepartmentScopeType),
    __metadata("design:type", String)
], CreateApprovalLineTemplateRequestDto.prototype, "orgScope", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '대상 부서 ID (orgScope가 DEPARTMENT인 경우 필수)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalLineTemplateRequestDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 목록', type: [create_form_request_dto_1.StepEditRequestDto] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: '최소 1개 이상의 결재 단계가 필요합니다' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_form_request_dto_1.StepEditRequestDto),
    __metadata("design:type", Array)
], CreateApprovalLineTemplateRequestDto.prototype, "steps", void 0);
//# sourceMappingURL=create-approval-line-template-request.dto.js.map