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
exports.CreateTestDocumentResponseDto = exports.CreateTestDocumentDto = exports.CreateTestDocumentQueryDto = exports.TestEmployeeId = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
var TestEmployeeId;
(function (TestEmployeeId) {
    TestEmployeeId["\uAE40\uADDC\uD604"] = "839e6f06-8d44-43a1-948c-095253c4cf8c";
    TestEmployeeId["\uAE40\uC885\uC2DD"] = "604a5c05-e0c0-495f-97bc-b86046db4342";
    TestEmployeeId["\uC6B0\uCC3D\uC6B1"] = "02b1d831-f278-4393-86ec-9db01248a1ec";
    TestEmployeeId["\uC774\uD654\uC601"] = "fd3336ea-2b7f-463a-9f21-cced8d68892f";
    TestEmployeeId["\uC870\uBBFC\uACBD"] = "1e9cc4b3-affb-4f63-9749-3480cd5261b9";
    TestEmployeeId["\uBC15\uD5CC\uB0A8"] = "f5f08c1d-9330-40f8-b80c-e75d9442503b";
    TestEmployeeId["\uC720\uC2B9\uD6C8"] = "dbfbb104-6560-4557-8079-7845a82ffe14";
    TestEmployeeId["\uBBFC\uC815\uD638"] = "2f0ecd69-1b07-4d33-8f49-b71ef9048d87";
})(TestEmployeeId || (exports.TestEmployeeId = TestEmployeeId = {}));
class CreateTestDocumentQueryDto {
}
exports.CreateTestDocumentQueryDto = CreateTestDocumentQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '[테스트] 휴가 신청서',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 내용 (HTML)',
        example: '<p>테스트 문서 내용입니다.</p>',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기안자 ID (테스트 직원 중 선택)',
        enum: TestEmployeeId,
        example: TestEmployeeId.김규현,
        enumName: 'TestEmployeeId',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeId),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.PENDING,
        enumName: 'DocumentStatus',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.DocumentStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계1] 결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
        enumName: 'ApprovalStepType',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step1Type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계1] 결재자 ID',
        enum: TestEmployeeId,
        example: TestEmployeeId.김종식,
        enumName: 'TestEmployeeId',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeId),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step1Approver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계1] 결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.APPROVED,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step1Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계2] 결재 단계 타입',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
        enumName: 'ApprovalStepType',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step2Type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계2] 결재자 ID',
        enum: TestEmployeeId,
        example: TestEmployeeId.김규현,
        enumName: 'TestEmployeeId',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeId),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step2Approver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[단계2] 결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step2Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계3] 결재 단계 타입 (선택)',
        enum: approval_enum_1.ApprovalStepType,
        enumName: 'ApprovalStepType',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step3Type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계3] 결재자 ID (선택)',
        enum: TestEmployeeId,
        enumName: 'TestEmployeeId',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeId),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step3Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계3] 결재 상태 (선택)',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step3Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계4] 결재 단계 타입 (선택)',
        enum: approval_enum_1.ApprovalStepType,
        enumName: 'ApprovalStepType',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step4Type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계4] 결재자 ID (선택)',
        enum: TestEmployeeId,
        enumName: 'TestEmployeeId',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeId),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step4Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[단계4] 결재 상태 (선택)',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "step4Status", void 0);
class CreateTestDocumentDto {
}
exports.CreateTestDocumentDto = CreateTestDocumentDto;
class CreateTestDocumentResponseDto {
}
exports.CreateTestDocumentResponseDto = CreateTestDocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성된 문서 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], CreateTestDocumentResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 번호',
        example: 'DOC-2025-0001',
    }),
    __metadata("design:type", String)
], CreateTestDocumentResponseDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '[테스트] 휴가 신청서',
    }),
    __metadata("design:type", String)
], CreateTestDocumentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 상태',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.PENDING,
    }),
    __metadata("design:type", String)
], CreateTestDocumentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성된 결재 단계 수',
        example: 3,
    }),
    __metadata("design:type", Number)
], CreateTestDocumentResponseDto.prototype, "approvalStepsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성 메시지',
        example: '테스트 문서가 성공적으로 생성되었습니다.',
    }),
    __metadata("design:type", String)
], CreateTestDocumentResponseDto.prototype, "message", void 0);
//# sourceMappingURL=create-test-document.dto.js.map