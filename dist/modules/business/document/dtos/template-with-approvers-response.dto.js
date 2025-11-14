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
exports.DocumentTemplateWithApproversResponseDto = exports.CategoryResponseDto = exports.ApprovalStepTemplateWithApproversDto = exports.MappedApproverDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class MappedApproverDto {
}
exports.MappedApproverDto = MappedApproverDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], MappedApproverDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 사번',
        example: 'EMP001',
    }),
    __metadata("design:type", String)
], MappedApproverDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], MappedApproverDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 이메일',
        example: 'hong@example.com',
    }),
    __metadata("design:type", String)
], MappedApproverDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할당 유형',
        example: 'FIXED',
    }),
    __metadata("design:type", String)
], MappedApproverDto.prototype, "type", void 0);
class ApprovalStepTemplateWithApproversDto {
}
exports.ApprovalStepTemplateWithApproversDto = ApprovalStepTemplateWithApproversDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "documentTemplateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], ApprovalStepTemplateWithApproversDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할당 규칙',
        enum: approval_enum_1.AssigneeRule,
        example: approval_enum_1.AssigneeRule.FIXED,
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "assigneeRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직원 ID (FIXED 규칙인 경우)',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "targetEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 부서 ID (DEPARTMENT_HEAD 규칙인 경우)',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "targetDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직책 ID (HIERARCHY_TO_POSITION 규칙인 경우)',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateWithApproversDto.prototype, "targetPositionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '맵핑된 결재자 목록',
        type: [MappedApproverDto],
    }),
    __metadata("design:type", Array)
], ApprovalStepTemplateWithApproversDto.prototype, "mappedApprovers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepTemplateWithApproversDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepTemplateWithApproversDto.prototype, "updatedAt", void 0);
class CategoryResponseDto {
}
exports.CategoryResponseDto = CategoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 이름',
        example: '인사',
    }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 코드',
        example: 'HR',
    }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 설명',
        example: '인사 관련 문서',
    }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "description", void 0);
class DocumentTemplateWithApproversResponseDto {
}
exports.DocumentTemplateWithApproversResponseDto = DocumentTemplateWithApproversResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 코드',
        example: 'VAC',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 설명',
        example: '휴가 신청을 위한 양식',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 상태',
        enum: approval_enum_1.DocumentTemplateStatus,
        example: approval_enum_1.DocumentTemplateStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML 템플릿',
        example: '<html>...</html>',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTemplateWithApproversResponseDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 정보',
        type: CategoryResponseDto,
    }),
    __metadata("design:type", CategoryResponseDto)
], DocumentTemplateWithApproversResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 템플릿 목록 (결재자 맵핑 포함)',
        type: [ApprovalStepTemplateWithApproversDto],
    }),
    __metadata("design:type", Array)
], DocumentTemplateWithApproversResponseDto.prototype, "approvalStepTemplates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentTemplateWithApproversResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentTemplateWithApproversResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=template-with-approvers-response.dto.js.map