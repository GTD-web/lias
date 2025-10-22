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
exports.DocumentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class DocumentResponseDto {
}
exports.DocumentResponseDto = DocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 ID' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 양식 ID' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "formId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 양식 버전 ID' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "formVersionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 제목' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 ID' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안 부서 ID', required: false }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "drafterDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 상태', enum: approval_enum_1.DocumentStatus }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 내용 (HTML 또는 문자열)', required: false }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '메타데이터 (JSON)', required: false }),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 번호', required: false }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 스냅샷 ID', required: false }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "approvalLineSnapshotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제출 일시', required: false }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '취소 사유', required: false }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '취소 일시', required: false }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성 일시' }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정 일시' }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=document-response.dto.js.map