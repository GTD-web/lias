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
exports.CreateFormRequestDto = exports.StepEditRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class StepEditRequestDto {
}
exports.StepEditRequestDto = StepEditRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 순서', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StepEditRequestDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 유형 (AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE)',
        example: 'APPROVAL',
        enum: approval_enum_1.ApprovalStepType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], StepEditRequestDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `담당자 지정 규칙
        
**정책 변경:** 결재 단계 설정 시 기본적으로 FIXED (고정 결재자)를 사용하는 것을 권장합니다.
프론트엔드에서 조직 정보를 받아 원하는 직원을 선택한 후, assigneeRule=FIXED와 targetEmployeeId를 함께 전달하세요.

**지원 규칙:**
- FIXED: 고정 담당자 (targetEmployeeId 필수)
- DEPARTMENT_HEAD: 부서장 (targetDepartmentId 선택)
- DRAFTER_SUPERIOR: 기안자의 상위자
- POSITION_BASED: 직책 기반 (targetPositionId 필수)`,
        example: 'FIXED',
        enum: approval_enum_1.AssigneeRule,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.AssigneeRule),
    __metadata("design:type", String)
], StepEditRequestDto.prototype, "assigneeRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '대상 부서 ID (DEPARTMENT_HEAD인 경우)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StepEditRequestDto.prototype, "targetDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '대상 직책 ID (POSITION_BASED인 경우)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StepEditRequestDto.prototype, "targetPositionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '대상 직원 ID (고정 담당자, FIXED인 경우 필수)',
        example: 'emp-uuid-123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StepEditRequestDto.prototype, "targetEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '필수 여부', example: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StepEditRequestDto.prototype, "isRequired", void 0);
class CreateFormRequestDto {
}
exports.CreateFormRequestDto = CreateFormRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 이름', example: '휴가 신청서' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "formName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '문서양식 코드', example: 'VACATION_REQUEST' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "formCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '문서양식 설명', example: '연차/반차 신청용' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서양식 HTML 템플릿 (미입력 시 빈 템플릿으로 생성)',
        example: '<h1>휴가 신청서</h1><p>신청 내용: </p>',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기존 결재선 사용 여부 (true: 기존 참조, false: 복제 후 수정, undefined: 결재선 없음 - 문서 제출 시 자동 생성)',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateFormRequestDto.prototype, "useExistingLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '기존 결재선 템플릿 버전 ID (useExistingLine=true 시 필수)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "lineTemplateVersionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '복제할 기준 결재선 템플릿 버전 ID (useExistingLine=false 시 필수)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormRequestDto.prototype, "baseLineTemplateVersionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '단계 수정 정보 (useExistingLine=false 시 사용)', type: [StepEditRequestDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StepEditRequestDto),
    __metadata("design:type", Array)
], CreateFormRequestDto.prototype, "stepEdits", void 0);
//# sourceMappingURL=create-form-request.dto.js.map