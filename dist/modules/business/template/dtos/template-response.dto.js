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
exports.CreateTemplateResponseDto = exports.DocumentTemplateResponseDto = exports.ApprovalStepTemplateResponseDto = exports.CategoryResponseDto = exports.CategoryDocumentTemplateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class CategoryDocumentTemplateDto {
}
exports.CategoryDocumentTemplateDto = CategoryDocumentTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CategoryDocumentTemplateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], CategoryDocumentTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 코드',
        example: 'VAC',
    }),
    __metadata("design:type", String)
], CategoryDocumentTemplateDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    }),
    __metadata("design:type", String)
], CategoryDocumentTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 상태',
        enum: approval_enum_1.DocumentTemplateStatus,
        example: approval_enum_1.DocumentTemplateStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], CategoryDocumentTemplateDto.prototype, "status", void 0);
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
        example: '인사 관련 문서 템플릿',
    }),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정렬 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], CategoryResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], CategoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], CategoryResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리에 속한 문서 템플릿 목록',
        type: [CategoryDocumentTemplateDto],
    }),
    __metadata("design:type", Array)
], CategoryResponseDto.prototype, "documentTemplates", void 0);
class ApprovalStepTemplateResponseDto {
}
exports.ApprovalStepTemplateResponseDto = ApprovalStepTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "documentTemplateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], ApprovalStepTemplateResponseDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할당 규칙',
        enum: approval_enum_1.AssigneeRule,
        example: approval_enum_1.AssigneeRule.FIXED,
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "assigneeRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직원 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "targetEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 부서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "targetDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직책 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepTemplateResponseDto.prototype, "targetPositionId", void 0);
class DocumentTemplateResponseDto {
}
exports.DocumentTemplateResponseDto = DocumentTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 코드',
        example: 'VAC',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 상태',
        enum: approval_enum_1.DocumentTemplateStatus,
        example: approval_enum_1.DocumentTemplateStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 정보',
        type: CategoryResponseDto,
    }),
    __metadata("design:type", CategoryResponseDto)
], DocumentTemplateResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateResponseDto],
    }),
    __metadata("design:type", Array)
], DocumentTemplateResponseDto.prototype, "approvalStepTemplates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentTemplateResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentTemplateResponseDto.prototype, "updatedAt", void 0);
class CreateTemplateResponseDto {
}
exports.CreateTemplateResponseDto = CreateTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 정보',
        type: DocumentTemplateResponseDto,
    }),
    __metadata("design:type", DocumentTemplateResponseDto)
], CreateTemplateResponseDto.prototype, "documentTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateResponseDto],
    }),
    __metadata("design:type", Array)
], CreateTemplateResponseDto.prototype, "approvalSteps", void 0);
//# sourceMappingURL=template-response.dto.js.map