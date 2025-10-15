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
exports.ApprovalResponseDto = exports.ApprovalStepResponseDto = exports.EmployeeResponseDto = exports.UpdateDraftDocumentDto = exports.CreateDraftDocumentDto = exports.FileDto = exports.CreateApprovalStepDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class CreateApprovalStepDto {
}
exports.CreateApprovalStepDto = CreateApprovalStepDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 타입' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApprovalStepDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 순서' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateApprovalStepDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApprovalStepDto.prototype, "approverId", void 0);
class FileDto {
}
exports.FileDto = FileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '파일 ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileDto.prototype, "fileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '파일 이름' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '파일 경로' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileDto.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], FileDto.prototype, "createdAt", void 0);
class CreateDraftDocumentDto {
}
exports.CreateDraftDocumentDto = CreateDraftDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서(품의) 번호' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서(품의) 유형' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 제목' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 내용' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 정보 객체', type: [CreateApprovalStepDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateDraftDocumentDto.prototype, "approvalSteps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부모 문서 ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDraftDocumentDto.prototype, "parentDocumentId", void 0);
class UpdateDraftDocumentDto extends CreateDraftDocumentDto {
}
exports.UpdateDraftDocumentDto = UpdateDraftDocumentDto;
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '홍길동' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25001' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hong@lumir.space', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '지상-Web', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '파트장', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '책임연구원', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "rank", void 0);
class ApprovalStepResponseDto {
}
exports.ApprovalStepResponseDto = ApprovalStepResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 타입' }),
    __metadata("design:type", String)
], ApprovalStepResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 순서' }),
    __metadata("design:type", Number)
], ApprovalStepResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepResponseDto.prototype, "isApproved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 일시' }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "approvedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 단계 여부' }),
    __metadata("design:type", Boolean)
], ApprovalStepResponseDto.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", Date)
], ApprovalStepResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자', type: EmployeeResponseDto }),
    __metadata("design:type", EmployeeResponseDto)
], ApprovalStepResponseDto.prototype, "approver", void 0);
class ApprovalResponseDto {
}
exports.ApprovalResponseDto = ApprovalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안 ID' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 번호' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서(품의) 유형' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 제목' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 내용' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 상태' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '보존 연한' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "retentionPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '보존 연한 단위' }),
    __metadata("design:type", String)
], ApprovalResponseDto.prototype, "retentionPeriodUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '보존 연한 시작일' }),
    __metadata("design:type", Date)
], ApprovalResponseDto.prototype, "retentionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '보존 연한 종료일' }),
    __metadata("design:type", Date)
], ApprovalResponseDto.prototype, "retentionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시행 일자' }),
    __metadata("design:type", Date)
], ApprovalResponseDto.prototype, "implementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", Date)
], ApprovalResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", Date)
], ApprovalResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자', type: EmployeeResponseDto }),
    __metadata("design:type", EmployeeResponseDto)
], ApprovalResponseDto.prototype, "drafter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 정보 객체', type: [ApprovalStepResponseDto] }),
    __metadata("design:type", Array)
], ApprovalResponseDto.prototype, "approvalSteps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 결재 단계', type: ApprovalStepResponseDto, required: false }),
    __metadata("design:type", ApprovalStepResponseDto)
], ApprovalResponseDto.prototype, "currentStep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부모 문서', type: ApprovalResponseDto }),
    __metadata("design:type", ApprovalResponseDto)
], ApprovalResponseDto.prototype, "parentDocument", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '파일', type: [FileDto] }),
    __metadata("design:type", Array)
], ApprovalResponseDto.prototype, "files", void 0);
//# sourceMappingURL=approval-draft.dto.js.map