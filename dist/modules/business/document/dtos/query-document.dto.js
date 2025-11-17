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
exports.QueryDocumentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
class QueryDocumentsDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.QueryDocumentsDto = QueryDocumentsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 상태 (DRAFT=임시저장, PENDING=대기, APPROVED=승인, REJECTED=반려, IMPLEMENTED=시행)',
        enum: approval_enum_1.DocumentStatus,
        example: approval_enum_1.DocumentStatus.PENDING,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.DocumentStatus),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'PENDING 상태일 때 현재 단계 타입 (AGREEMENT=협의, APPROVAL=미결)',
        enum: approval_enum_1.ApprovalStepType,
        example: approval_enum_1.ApprovalStepType.APPROVAL,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(approval_enum_1.ApprovalStepType),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "pendingStepType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '기안자 ID (내가 기안한 문서 조회)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "drafterId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '참조자 ID (내가 참조자로 있는 문서 조회, 기안자 무관, DRAFT 제외)',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "referenceUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '검색어 (문서 제목)',
        example: '휴가',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "searchKeyword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지 번호 (1부터 시작)',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryDocumentsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지당 항목 수',
        example: 20,
        default: 20,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], QueryDocumentsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시작 날짜 (YYYY-MM-DD)',
        example: '2025-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '종료 날짜 (YYYY-MM-DD)',
        example: '2025-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDocumentsDto.prototype, "endDate", void 0);
//# sourceMappingURL=query-document.dto.js.map