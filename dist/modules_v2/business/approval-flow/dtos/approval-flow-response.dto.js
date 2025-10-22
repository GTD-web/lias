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
exports.ApprovalSnapshotResponseDto = exports.ApprovalStepSnapshotResponseDto = exports.ApprovalLineTemplateVersionResponseDto = exports.ApprovalLineTemplateResponseDto = exports.UpdateFormVersionResponseDto = exports.CreateFormResponseDto = exports.FormVersionResponseDto = exports.FormResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FormResponseDto {
}
exports.FormResponseDto = FormResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 ID' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 이름' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 코드' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서양식 설명' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 상태' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 버전 ID' }),
    __metadata("design:type", String)
], FormResponseDto.prototype, "currentVersionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", Date)
], FormResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일시' }),
    __metadata("design:type", Date)
], FormResponseDto.prototype, "updatedAt", void 0);
class FormVersionResponseDto {
}
exports.FormVersionResponseDto = FormVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 버전 ID' }),
    __metadata("design:type", String)
], FormVersionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 ID' }),
    __metadata("design:type", String)
], FormVersionResponseDto.prototype, "formId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '버전 번호' }),
    __metadata("design:type", Number)
], FormVersionResponseDto.prototype, "versionNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성 여부' }),
    __metadata("design:type", Boolean)
], FormVersionResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '변경 사유' }),
    __metadata("design:type", String)
], FormVersionResponseDto.prototype, "changeReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", Date)
], FormVersionResponseDto.prototype, "createdAt", void 0);
class CreateFormResponseDto {
}
exports.CreateFormResponseDto = CreateFormResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 문서양식', type: FormResponseDto }),
    __metadata("design:type", FormResponseDto)
], CreateFormResponseDto.prototype, "form", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 문서양식 버전', type: FormVersionResponseDto }),
    __metadata("design:type", FormVersionResponseDto)
], CreateFormResponseDto.prototype, "formVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연결된 결재선 템플릿 버전 ID' }),
    __metadata("design:type", String)
], CreateFormResponseDto.prototype, "lineTemplateVersionId", void 0);
class UpdateFormVersionResponseDto {
}
exports.UpdateFormVersionResponseDto = UpdateFormVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정된 문서양식', type: FormResponseDto }),
    __metadata("design:type", FormResponseDto)
], UpdateFormVersionResponseDto.prototype, "form", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '새로 생성된 문서양식 버전', type: FormVersionResponseDto }),
    __metadata("design:type", FormVersionResponseDto)
], UpdateFormVersionResponseDto.prototype, "newVersion", void 0);
class ApprovalLineTemplateResponseDto {
}
exports.ApprovalLineTemplateResponseDto = ApprovalLineTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 이름' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재선 템플릿 설명' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 유형 (COMMON, CUSTOM)' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '조직 범위 (ALL, SPECIFIC_DEPARTMENT)' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "orgScope", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '대상 부서 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '템플릿 상태' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 버전 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateResponseDto.prototype, "currentVersionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", Date)
], ApprovalLineTemplateResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일시' }),
    __metadata("design:type", Date)
], ApprovalLineTemplateResponseDto.prototype, "updatedAt", void 0);
class ApprovalLineTemplateVersionResponseDto {
}
exports.ApprovalLineTemplateVersionResponseDto = ApprovalLineTemplateVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 버전 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 ID' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersionResponseDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '버전 번호' }),
    __metadata("design:type", Number)
], ApprovalLineTemplateVersionResponseDto.prototype, "versionNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성 여부' }),
    __metadata("design:type", Boolean)
], ApprovalLineTemplateVersionResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '변경 사유' }),
    __metadata("design:type", String)
], ApprovalLineTemplateVersionResponseDto.prototype, "changeReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", Date)
], ApprovalLineTemplateVersionResponseDto.prototype, "createdAt", void 0);
class ApprovalStepSnapshotResponseDto {
}
exports.ApprovalStepSnapshotResponseDto = ApprovalStepSnapshotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepSnapshotResponseDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 유형' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재자 부서 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "approverDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재자 직책 ID' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "approverPositionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '필수 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepSnapshotResponseDto.prototype, "required", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 상태' }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "status", void 0);
class ApprovalSnapshotResponseDto {
}
exports.ApprovalSnapshotResponseDto = ApprovalSnapshotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalSnapshotResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 ID' }),
    __metadata("design:type", String)
], ApprovalSnapshotResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '스냅샷 생성일시' }),
    __metadata("design:type", Date)
], ApprovalSnapshotResponseDto.prototype, "frozenAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '결재 단계 목록', type: [ApprovalStepSnapshotResponseDto] }),
    __metadata("design:type", Array)
], ApprovalSnapshotResponseDto.prototype, "steps", void 0);
//# sourceMappingURL=approval-flow-response.dto.js.map