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
exports.CreateTestDocumentResponseDto = exports.CreateTestDocumentDto = exports.CreateTestDocumentQueryDto = exports.TEST_EMPLOYEE_ID_MAP = exports.TestEmployeeName = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
var TestEmployeeName;
(function (TestEmployeeName) {
    TestEmployeeName["\uAE40\uADDC\uD604"] = "\uAE40\uADDC\uD604";
    TestEmployeeName["\uAE40\uC885\uC2DD"] = "\uAE40\uC885\uC2DD";
    TestEmployeeName["\uC6B0\uCC3D\uC6B1"] = "\uC6B0\uCC3D\uC6B1";
    TestEmployeeName["\uC774\uD654\uC601"] = "\uC774\uD654\uC601";
    TestEmployeeName["\uC870\uBBFC\uACBD"] = "\uC870\uBBFC\uACBD";
    TestEmployeeName["\uBC15\uD5CC\uB0A8"] = "\uBC15\uD5CC\uB0A8";
    TestEmployeeName["\uC720\uC2B9\uD6C8"] = "\uC720\uC2B9\uD6C8";
    TestEmployeeName["\uBBFC\uC815\uD638"] = "\uBBFC\uC815\uD638";
})(TestEmployeeName || (exports.TestEmployeeName = TestEmployeeName = {}));
exports.TEST_EMPLOYEE_ID_MAP = {
    [TestEmployeeName.김규현]: '839e6f06-8d44-43a1-948c-095253c4cf8c',
    [TestEmployeeName.김종식]: '604a5c05-e0c0-495f-97bc-b86046db4342',
    [TestEmployeeName.우창욱]: '02b1d831-f278-4393-86ec-9db01248a1ec',
    [TestEmployeeName.이화영]: 'fd3336ea-2b7f-463a-9f21-cced8d68892f',
    [TestEmployeeName.조민경]: '1e9cc4b3-affb-4f63-9749-3480cd5261b9',
    [TestEmployeeName.박헌남]: 'f5f08c1d-9330-40f8-b80c-e75d9442503b',
    [TestEmployeeName.유승훈]: 'dbfbb104-6560-4557-8079-7845a82ffe14',
    [TestEmployeeName.민정호]: '2f0ecd69-1b07-4d33-8f49-b71ef9048d87',
};
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
        description: '기안자 선택',
        enum: TestEmployeeName,
        example: TestEmployeeName.김규현,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "drafterName", void 0);
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
    (0, swagger_1.ApiPropertyOptional)({
        description: '[합의1] 합의자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "agreement1Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[합의1] 합의 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "agreement1Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[합의2] 합의자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "agreement2Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[합의2] 합의 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "agreement2Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[결재1] 결재자 선택 (필수)',
        enum: TestEmployeeName,
        example: TestEmployeeName.김종식,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval1Approver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[결재1] 결재 상태 (필수)',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.APPROVED,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval1Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[결재2] 결재자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval2Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[결재2] 결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval2Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[결재3] 결재자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval3Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[결재3] 결재 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "approval3Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[시행] 시행자 선택 (필수)',
        enum: TestEmployeeName,
        example: TestEmployeeName.김규현,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "implementationApprover", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '[시행] 시행 상태 (필수)',
        enum: approval_enum_1.ApprovalStatus,
        example: approval_enum_1.ApprovalStatus.PENDING,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "implementationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[참조1] 참조자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "reference1Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[참조1] 참조 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "reference1Status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[참조2] 참조자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestEmployeeName),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "reference2Approver", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '[참조2] 참조 상태',
        enum: approval_enum_1.ApprovalStatus,
        enumName: 'ApprovalStatus',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateTestDocumentQueryDto.prototype, "reference2Status", void 0);
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
        example: 'TEST-2025-123456',
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