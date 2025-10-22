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
exports.CreateSnapshotRequestDto = exports.DraftContextRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DraftContextRequestDto {
}
exports.DraftContextRequestDto = DraftContextRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안자 ID', example: 'employee-123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DraftContextRequestDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '기안자 부서 ID', example: 'dept-456' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DraftContextRequestDto.prototype, "drafterDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서 금액 (금액 기반 결재선용)', example: 1000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DraftContextRequestDto.prototype, "documentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서 유형', example: 'EXPENSE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DraftContextRequestDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '추가 컨텍스트 정보', example: { projectId: 'proj-789' } }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DraftContextRequestDto.prototype, "customFields", void 0);
class CreateSnapshotRequestDto {
}
exports.CreateSnapshotRequestDto = CreateSnapshotRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서 ID', example: 'document-123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSnapshotRequestDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 버전 ID', example: 'form-version-456' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSnapshotRequestDto.prototype, "formVersionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기안 컨텍스트 정보', type: DraftContextRequestDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DraftContextRequestDto)
], CreateSnapshotRequestDto.prototype, "draftContext", void 0);
//# sourceMappingURL=create-snapshot-request.dto.js.map