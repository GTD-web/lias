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
exports.PaginatedPendingApprovalsResponseDto = exports.MyPendingDocumentItemDto = exports.ApprovalStepSummaryDto = exports.CurrentStepInfoDto = exports.PaginationMetaDto = exports.CompleteImplementationResponseDto = exports.CancelApprovalResponseDto = exports.DocumentApprovalStepsResponseDto = exports.PendingApprovalItemDto = exports.ApprovalActionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const document_response_dto_1 = require("../../document/dtos/document-response.dto");
class ApprovalActionResponseDto {
}
exports.ApprovalActionResponseDto = ApprovalActionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 스냅샷 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], ApprovalActionResponseDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.APPROVED,
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 의견',
        example: '승인합니다.',
    }),
    __metadata("design:type", String)
], ApprovalActionResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 완료 시간',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalActionResponseDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalActionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalActionResponseDto.prototype, "updatedAt", void 0);
class PendingApprovalItemDto {
}
exports.PendingApprovalItemDto = PendingApprovalItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 스냅샷 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "stepSnapshotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 번호',
        example: 'VAC-2025-0001',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "documentTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "drafterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], PendingApprovalItemDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], PendingApprovalItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], PendingApprovalItemDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], PendingApprovalItemDto.prototype, "createdAt", void 0);
class DocumentApprovalStepsResponseDto {
}
exports.DocumentApprovalStepsResponseDto = DocumentApprovalStepsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentApprovalStepsResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.PENDING,
    }),
    __metadata("design:type", String)
], DocumentApprovalStepsResponseDto.prototype, "documentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 단계 목록',
        type: [document_response_dto_1.ApprovalStepSnapshotResponseDto],
    }),
    __metadata("design:type", Array)
], DocumentApprovalStepsResponseDto.prototype, "steps", void 0);
class CancelApprovalResponseDto {
}
exports.CancelApprovalResponseDto = CancelApprovalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CancelApprovalResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.CANCELLED,
    }),
    __metadata("design:type", String)
], CancelApprovalResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '취소 사유',
        example: '내용 수정 필요',
    }),
    __metadata("design:type", String)
], CancelApprovalResponseDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '취소 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], CancelApprovalResponseDto.prototype, "cancelledAt", void 0);
class CompleteImplementationResponseDto extends ApprovalActionResponseDto {
}
exports.CompleteImplementationResponseDto = CompleteImplementationResponseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시행 결과 데이터',
        example: { result: '완료', amount: 100000 },
    }),
    __metadata("design:type", Object)
], CompleteImplementationResponseDto.prototype, "resultData", void 0);
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
class CurrentStepInfoDto {
}
exports.CurrentStepInfoDto = CurrentStepInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CurrentStepInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], CurrentStepInfoDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], CurrentStepInfoDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], CurrentStepInfoDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CurrentStepInfoDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재자 정보',
        type: document_response_dto_1.ApproverSnapshotMetadataDto,
    }),
    __metadata("design:type", document_response_dto_1.ApproverSnapshotMetadataDto)
], CurrentStepInfoDto.prototype, "approverSnapshot", void 0);
class ApprovalStepSummaryDto {
}
exports.ApprovalStepSummaryDto = ApprovalStepSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 순서',
        example: 1,
    }),
    __metadata("design:type", Number)
], ApprovalStepSummaryDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "approverName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 의견',
        example: '승인합니다.',
    }),
    __metadata("design:type", String)
], ApprovalStepSummaryDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 완료 시간',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ApprovalStepSummaryDto.prototype, "approvedAt", void 0);
class MyPendingDocumentItemDto {
}
exports.MyPendingDocumentItemDto = MyPendingDocumentItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 번호',
        example: 'VAC-2025-0001',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '휴가 신청서',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.PENDING,
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "drafterName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 부서명',
        example: '인사팀',
    }),
    __metadata("design:type", String)
], MyPendingDocumentItemDto.prototype, "drafterDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '현재 처리해야 할 단계 정보 (합의/미결일 때만)',
        type: CurrentStepInfoDto,
    }),
    __metadata("design:type", CurrentStepInfoDto)
], MyPendingDocumentItemDto.prototype, "currentStep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '전체 결재 단계 목록',
        type: [ApprovalStepSummaryDto],
    }),
    __metadata("design:type", Array)
], MyPendingDocumentItemDto.prototype, "approvalSteps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안(상신) 일시',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], MyPendingDocumentItemDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], MyPendingDocumentItemDto.prototype, "createdAt", void 0);
class PaginatedPendingApprovalsResponseDto {
}
exports.PaginatedPendingApprovalsResponseDto = PaginatedPendingApprovalsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '대기 문서 목록',
        type: [MyPendingDocumentItemDto],
    }),
    __metadata("design:type", Array)
], PaginatedPendingApprovalsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '페이징 메타데이터',
        type: PaginationMetaDto,
    }),
    __metadata("design:type", PaginationMetaDto)
], PaginatedPendingApprovalsResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=approval-process-response.dto.js.map