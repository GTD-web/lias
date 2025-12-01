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
exports.PaginatedDocumentsResponseDto = exports.PaginationMetaDto = exports.SubmitDocumentResponseDto = exports.DocumentResponseDto = exports.DrafterSimpleDto = exports.RankSimpleDto = exports.PositionSimpleDto = exports.DepartmentSimpleDto = exports.DocumentTemplateSimpleResponseDto = exports.ApprovalStepSnapshotResponseDto = exports.ApproverSnapshotMetadataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class ApproverSnapshotMetadataDto {
}
exports.ApproverSnapshotMetadataDto = ApproverSnapshotMetadataDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부서명',
        example: '개발팀',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직책 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직책명',
        example: '팀장',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직급 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "rankId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직급명',
        example: '과장',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "rankTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원명',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사번',
        example: 'EMP001',
    }),
    __metadata("design:type", String)
], ApproverSnapshotMetadataDto.prototype, "employeeNumber", void 0);
class ApprovalStepSnapshotResponseDto {
}
exports.ApprovalStepSnapshotResponseDto = ApprovalStepSnapshotResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 스냅샷 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], ApprovalStepSnapshotResponseDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재자 스냅샷 정보',
        type: ApproverSnapshotMetadataDto,
    }),
    __metadata("design:type", ApproverSnapshotMetadataDto)
], ApprovalStepSnapshotResponseDto.prototype, "approverSnapshot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 의견',
        example: '승인합니다.',
    }),
    __metadata("design:type", String)
], ApprovalStepSnapshotResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 완료 시간',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepSnapshotResponseDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepSnapshotResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepSnapshotResponseDto.prototype, "updatedAt", void 0);
class CategorySimpleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CategorySimpleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 이름',
        example: '인사',
    }),
    __metadata("design:type", String)
], CategorySimpleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 코드',
        example: 'HR',
    }),
    __metadata("design:type", String)
], CategorySimpleDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 설명',
        example: '인사 관련 문서',
    }),
    __metadata("design:type", String)
], CategorySimpleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정렬 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], CategorySimpleDto.prototype, "order", void 0);
class DocumentTemplateSimpleResponseDto {
}
exports.DocumentTemplateSimpleResponseDto = DocumentTemplateSimpleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTemplateSimpleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], DocumentTemplateSimpleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 템플릿 코드',
        example: 'VACATION',
    }),
    __metadata("design:type", String)
], DocumentTemplateSimpleResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 정보',
        type: CategorySimpleDto,
    }),
    __metadata("design:type", CategorySimpleDto)
], DocumentTemplateSimpleResponseDto.prototype, "category", void 0);
class DepartmentSimpleDto {
}
exports.DepartmentSimpleDto = DepartmentSimpleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DepartmentSimpleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서명',
        example: '개발팀',
    }),
    __metadata("design:type", String)
], DepartmentSimpleDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 코드',
        example: 'DEV',
    }),
    __metadata("design:type", String)
], DepartmentSimpleDto.prototype, "departmentCode", void 0);
class PositionSimpleDto {
}
exports.PositionSimpleDto = PositionSimpleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PositionSimpleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책명',
        example: '팀장',
    }),
    __metadata("design:type", String)
], PositionSimpleDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책 코드',
        example: 'MANAGER',
    }),
    __metadata("design:type", String)
], PositionSimpleDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책 레벨',
        example: 3,
    }),
    __metadata("design:type", Number)
], PositionSimpleDto.prototype, "level", void 0);
class RankSimpleDto {
}
exports.RankSimpleDto = RankSimpleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직급 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], RankSimpleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직급명',
        example: '과장',
    }),
    __metadata("design:type", String)
], RankSimpleDto.prototype, "rankTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직급 코드',
        example: 'MANAGER',
    }),
    __metadata("design:type", String)
], RankSimpleDto.prototype, "rankCode", void 0);
class DrafterSimpleDto {
}
exports.DrafterSimpleDto = DrafterSimpleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DrafterSimpleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 사번',
        example: 'EMP001',
    }),
    __metadata("design:type", String)
], DrafterSimpleDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], DrafterSimpleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 이메일',
        example: 'hong@example.com',
    }),
    __metadata("design:type", String)
], DrafterSimpleDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 부서 정보',
        type: DepartmentSimpleDto,
    }),
    __metadata("design:type", DepartmentSimpleDto)
], DrafterSimpleDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 직책 정보',
        type: PositionSimpleDto,
    }),
    __metadata("design:type", PositionSimpleDto)
], DrafterSimpleDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 직급 정보',
        type: RankSimpleDto,
    }),
    __metadata("design:type", RankSimpleDto)
], DrafterSimpleDto.prototype, "rank", void 0);
class DocumentResponseDto {
}
exports.DocumentResponseDto = DocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 번호',
        example: 'VAC-2025-0001',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 내용 (HTML)',
        example: '<html>...</html>',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.DRAFT,
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 비고',
        example: '비고 내용',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 메타데이터',
        example: { amount: 100000, date: '2025-01-01' },
    }),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 정보',
        type: DrafterSimpleDto,
    }),
    __metadata("design:type", DrafterSimpleDto)
], DocumentResponseDto.prototype, "drafter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "documentTemplateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 템플릿 정보',
        type: DocumentTemplateSimpleResponseDto,
    }),
    __metadata("design:type", DocumentTemplateSimpleResponseDto)
], DocumentResponseDto.prototype, "documentTemplate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '보존 연한',
        example: '10년',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "retentionPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '보존 연한 단위',
        example: '년',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "retentionPeriodUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '보존 연한 시작일',
        example: '2025-01-01',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "retentionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '보존 연한 종료일',
        example: '2035-01-01',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "retentionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안(상신) 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '취소 사유',
        example: '내용 수정 필요',
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '취소 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 완료 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '반려 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "rejectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 단계 스냅샷 목록',
        type: [ApprovalStepSnapshotResponseDto],
    }),
    __metadata("design:type", Array)
], DocumentResponseDto.prototype, "approvalSteps", void 0);
class SubmitDocumentResponseDto {
}
exports.SubmitDocumentResponseDto = SubmitDocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 정보',
        type: DocumentResponseDto,
    }),
    __metadata("design:type", DocumentResponseDto)
], SubmitDocumentResponseDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 스냅샷 목록',
        type: [ApprovalStepSnapshotResponseDto],
    }),
    __metadata("design:type", Array)
], SubmitDocumentResponseDto.prototype, "approvalSteps", void 0);
class PaginationMetaDto {
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 페이지',
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이지당 항목 수',
        example: 20,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '전체 항목 수',
        example: 100,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '전체 페이지 수',
        example: 5,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다음 페이지 존재 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginationMetaDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이전 페이지 존재 여부',
        example: false,
    }),
    __metadata("design:type", Boolean)
], PaginationMetaDto.prototype, "hasPreviousPage", void 0);
class PaginatedDocumentsResponseDto {
}
exports.PaginatedDocumentsResponseDto = PaginatedDocumentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 목록',
        type: [DocumentResponseDto],
    }),
    __metadata("design:type", Array)
], PaginatedDocumentsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이징 메타데이터',
        type: PaginationMetaDto,
    }),
    __metadata("design:type", PaginationMetaDto)
], PaginatedDocumentsResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=document-response.dto.js.map