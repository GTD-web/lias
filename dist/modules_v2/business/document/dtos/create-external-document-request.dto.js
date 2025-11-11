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
exports.CreateExternalDocumentRequestDto = exports.CustomApprovalStepDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CustomApprovalStepDto {
}
exports.CustomApprovalStepDto = CustomApprovalStepDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 순서',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CustomApprovalStepDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 타입',
        example: 'APPROVAL',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomApprovalStepDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '필수 여부',
        example: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CustomApprovalStepDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '담당자 직원 ID (개별 선택시)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CustomApprovalStepDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '담당 부서 ID (부서 선택시)',
        example: '123e4567-e89b-12d3-a456-426614174001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CustomApprovalStepDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '담당자 할당 규칙',
        example: 'FIXED',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomApprovalStepDto.prototype, "assigneeRule", void 0);
class CreateExternalDocumentRequestDto {
}
exports.CreateExternalDocumentRequestDto = CreateExternalDocumentRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 제목',
        example: '외부 시스템에서 생성된 문서',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExternalDocumentRequestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 내용 (HTML 또는 문자열)',
        example: '<p>외부 시스템에서 전송된 문서 내용</p>',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExternalDocumentRequestDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '메타데이터 (JSON)',
        example: { urgency: 'high', source: 'external' },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateExternalDocumentRequestDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 정의 결재선 단계 (문서 생성 시 결재선 지정)',
        type: [CustomApprovalStepDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CustomApprovalStepDto),
    __metadata("design:type", Array)
], CreateExternalDocumentRequestDto.prototype, "customApprovalSteps", void 0);
//# sourceMappingURL=create-external-document-request.dto.js.map