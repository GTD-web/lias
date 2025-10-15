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
exports.FormApprovalLineResponseDto = exports.FormApprovalStepResponseDto = exports.ApproverResponseDto = exports.UpdateFormApprovalLineDto = exports.CreateFormApprovalLineDto = exports.CreateFormApprovalStepDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const class_transformer_1 = require("class-transformer");
class CreateFormApprovalStepDto {
}
exports.CreateFormApprovalStepDto = CreateFormApprovalStepDto;
__decorate([
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        enum: approval_enum_1.ApprovalStepType,
        description: '결재 단계 타입',
        example: '결재',
    }),
    __metadata("design:type", String)
], CreateFormApprovalStepDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateFormApprovalStepDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '기본 결재자 ID',
        example: 'uuid',
        required: false,
    }),
    __metadata("design:type", String)
], CreateFormApprovalStepDto.prototype, "defaultApproverId", void 0);
class CreateFormApprovalLineDto {
}
exports.CreateFormApprovalLineDto = CreateFormApprovalLineDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 이름',
        example: '결재선 1',
    }),
    __metadata("design:type", String)
], CreateFormApprovalLineDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 설명',
        example: '결재선 1 설명',
        required: false,
    }),
    __metadata("design:type", String)
], CreateFormApprovalLineDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalLineType),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        enum: approval_enum_1.ApprovalLineType,
        description: '결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화)',
        example: approval_enum_1.ApprovalLineType.COMMON,
    }),
    __metadata("design:type", String)
], CreateFormApprovalLineDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: [CreateFormApprovalStepDto],
        description: '결재선 단계',
        example: [
            {
                type: '결재',
                order: 1,
                defaultApproverId: '1',
            },
        ],
    }),
    __metadata("design:type", Array)
], CreateFormApprovalLineDto.prototype, "formApprovalSteps", void 0);
class UpdateFormApprovalLineDto {
}
exports.UpdateFormApprovalLineDto = UpdateFormApprovalLineDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 이름',
        example: '결재선 1',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateFormApprovalLineDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 설명',
        example: '결재선 1 설명',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateFormApprovalLineDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalLineType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        enum: approval_enum_1.ApprovalLineType,
        description: '결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화)',
        example: approval_enum_1.ApprovalLineType.COMMON,
        required: false,
    }),
    __metadata("design:type", String)
], UpdateFormApprovalLineDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], UpdateFormApprovalLineDto.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateFormApprovalStepDto),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: [CreateFormApprovalStepDto],
        description: '결재선 단계',
        example: [
            {
                type: '결재',
                order: 1,
                defaultApproverId: 'uuid',
            },
        ],
    }),
    __metadata("design:type", Array)
], UpdateFormApprovalLineDto.prototype, "formApprovalSteps", void 0);
class ApproverResponseDto {
}
exports.ApproverResponseDto = ApproverResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: '1',
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 사번',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 부서',
        example: '1234567890',
        required: false,
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 직책',
        example: '1234567890',
        required: false,
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 직급',
        example: '1234567890',
        required: false,
    }),
    __metadata("design:type", String)
], ApproverResponseDto.prototype, "rank", void 0);
class FormApprovalStepResponseDto {
}
exports.FormApprovalStepResponseDto = FormApprovalStepResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 단계 ID',
        example: '1',
    }),
    __metadata("design:type", String)
], FormApprovalStepResponseDto.prototype, "formApprovalStepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `결재선 단계 타입, ${Object.values(approval_enum_1.ApprovalStepType).join(', ')}`,
        example: approval_enum_1.ApprovalStepType.AGREEMENT,
    }),
    __metadata("design:type", String)
], FormApprovalStepResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], FormApprovalStepResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ApproverResponseDto,
        description: '기본 결재자',
        example: {
            employeeId: '1',
            name: '홍길동',
            employeeNumber: '1234567890',
            department: '1234567890',
            position: '1234567890',
        },
    }),
    __metadata("design:type", ApproverResponseDto)
], FormApprovalStepResponseDto.prototype, "defaultApprover", void 0);
class FormApprovalLineResponseDto {
}
exports.FormApprovalLineResponseDto = FormApprovalLineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 ID',
        example: '1',
    }),
    __metadata("design:type", String)
], FormApprovalLineResponseDto.prototype, "formApprovalLineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 이름',
        example: '결재선 1',
    }),
    __metadata("design:type", String)
], FormApprovalLineResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 설명',
        example: '결재선 1 설명',
    }),
    __metadata("design:type", String)
], FormApprovalLineResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 타입',
        example: 'COMMON',
    }),
    __metadata("design:type", String)
], FormApprovalLineResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 사용 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FormApprovalLineResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 정렬 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], FormApprovalLineResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 생성일',
        example: '2021-01-01',
    }),
    __metadata("design:type", Date)
], FormApprovalLineResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재선 수정일',
        example: '2021-01-01',
    }),
    __metadata("design:type", Date)
], FormApprovalLineResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [FormApprovalStepResponseDto],
        description: '결재선 단계',
        example: [
            {
                formApprovalStepId: '1',
                type: '결재',
                order: 1,
                approverType: 'USER',
                approverValue: '1',
            },
        ],
    }),
    __metadata("design:type", Array)
], FormApprovalLineResponseDto.prototype, "formApprovalSteps", void 0);
//# sourceMappingURL=approval-line.dto.js.map