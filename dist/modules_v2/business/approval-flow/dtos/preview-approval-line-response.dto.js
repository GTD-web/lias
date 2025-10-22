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
exports.PreviewApprovalLineResponseDto = exports.ApprovalStepPreviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApprovalStepPreviewDto {
}
exports.ApprovalStepPreviewDto = ApprovalStepPreviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단계 순서', example: 1 }),
    __metadata("design:type", Number)
], ApprovalStepPreviewDto.prototype, "stepOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '단계 유형',
        example: 'APPROVAL',
        enum: ['AGREEMENT', 'APPROVAL', 'IMPLEMENTATION', 'REFERENCE'],
    }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "stepType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '필수 여부', example: true }),
    __metadata("design:type", Boolean)
], ApprovalStepPreviewDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 직원 ID', example: '123e4567-e89b-12d3-a456-426614174001' }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 이름', example: '홍길동' }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 부서명', example: '개발팀', required: false }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재자 직책명', example: '팀장', required: false }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignee Rule', example: 'DRAFTER_SUPERIOR' }),
    __metadata("design:type", String)
], ApprovalStepPreviewDto.prototype, "assigneeRule", void 0);
class PreviewApprovalLineResponseDto {
}
exports.PreviewApprovalLineResponseDto = PreviewApprovalLineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 이름', example: '일반 결재선' }),
    __metadata("design:type", String)
], PreviewApprovalLineResponseDto.prototype, "templateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재선 템플릿 설명', required: false }),
    __metadata("design:type", String)
], PreviewApprovalLineResponseDto.prototype, "templateDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '결재 단계 목록', type: [ApprovalStepPreviewDto] }),
    __metadata("design:type", Array)
], PreviewApprovalLineResponseDto.prototype, "steps", void 0);
//# sourceMappingURL=preview-approval-line-response.dto.js.map