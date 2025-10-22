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
exports.DocumentApprovalStatusResponseDto = exports.ApprovalStepResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class ApprovalStepResponseDto {
}
exports.ApprovalStepResponseDto = ApprovalStepResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 스냅샷 ID' }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "snapshotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepResponseDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 유형', enum: approval_enum_1.ApprovalStepType }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 ID' }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 이름', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 부서 ID', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 부서명', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 직위 ID', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverPositionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 직책명', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "approverPositionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignee Rule', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "assigneeRule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태', enum: approval_enum_1.ApprovalStatus }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 의견', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '승인/반려 일시', required: false }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '필수 결재 여부', required: false }),
    __metadata("design:type", Boolean)
], ApprovalStepResponseDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 설명', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성 일시' }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 ID', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 제목', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "documentTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 번호', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 ID', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 이름', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "drafterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 부서명', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "drafterDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 상태', required: false }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "documentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제출 일시', required: false }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "submittedAt", void 0);
class DocumentApprovalStatusResponseDto {
}
exports.DocumentApprovalStatusResponseDto = DocumentApprovalStatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 ID' }),
    __metadata("design:type", String)
], DocumentApprovalStatusResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 목록', type: [ApprovalStepResponseDto] }),
    __metadata("design:type", Array)
], DocumentApprovalStatusResponseDto.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 단계 수' }),
    __metadata("design:type", Number)
], DocumentApprovalStatusResponseDto.prototype, "totalSteps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '완료된 단계 수' }),
    __metadata("design:type", Number)
], DocumentApprovalStatusResponseDto.prototype, "completedSteps", void 0);
//# sourceMappingURL=approval-process-response.dto.js.map