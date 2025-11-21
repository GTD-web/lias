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
exports.QueryMyAllDocumentsDto = exports.ReferenceReadStatus = exports.ApprovalFilterStatus = exports.MyAllDocumentFilterType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var MyAllDocumentFilterType;
(function (MyAllDocumentFilterType) {
    MyAllDocumentFilterType["DRAFT"] = "DRAFT";
    MyAllDocumentFilterType["PENDING"] = "PENDING";
    MyAllDocumentFilterType["PENDING_AGREEMENT"] = "PENDING_AGREEMENT";
    MyAllDocumentFilterType["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    MyAllDocumentFilterType["IMPLEMENTATION"] = "IMPLEMENTATION";
    MyAllDocumentFilterType["APPROVED"] = "APPROVED";
    MyAllDocumentFilterType["REJECTED"] = "REJECTED";
    MyAllDocumentFilterType["RECEIVED_REFERENCE"] = "RECEIVED_REFERENCE";
})(MyAllDocumentFilterType || (exports.MyAllDocumentFilterType = MyAllDocumentFilterType = {}));
var ApprovalFilterStatus;
(function (ApprovalFilterStatus) {
    ApprovalFilterStatus["SCHEDULED"] = "SCHEDULED";
    ApprovalFilterStatus["CURRENT"] = "CURRENT";
    ApprovalFilterStatus["COMPLETED"] = "COMPLETED";
})(ApprovalFilterStatus || (exports.ApprovalFilterStatus = ApprovalFilterStatus = {}));
var ReferenceReadStatus;
(function (ReferenceReadStatus) {
    ReferenceReadStatus["READ"] = "READ";
    ReferenceReadStatus["UNREAD"] = "UNREAD";
})(ReferenceReadStatus || (exports.ReferenceReadStatus = ReferenceReadStatus = {}));
class QueryMyAllDocumentsDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.QueryMyAllDocumentsDto = QueryMyAllDocumentsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 ID (필수)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 필터 타입 (통계와 동일한 구분)\n' +
            '- DRAFT: 임시저장\n' +
            '- PENDING: 상신함\n' +
            '- PENDING_AGREEMENT: 합의함\n' +
            '- PENDING_APPROVAL: 결재함\n' +
            '- IMPLEMENTATION: 시행함\n' +
            '- APPROVED: 기결함\n' +
            '- REJECTED: 반려함\n' +
            '- RECEIVED_REFERENCE: 수신참조함',
        enum: MyAllDocumentFilterType,
        example: MyAllDocumentFilterType.PENDING_APPROVAL,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(MyAllDocumentFilterType),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "filterType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '승인 상태 필터 (PENDING_AGREEMENT, PENDING_APPROVAL에만 적용)\n' +
            '- SCHEDULED: 승인 예정 (아직 내 차례가 아님)\n' +
            '- CURRENT: 승인할 차례 (현재 내 차례)\n' +
            '- COMPLETED: 승인 완료 (내가 이미 승인함)',
        enum: ApprovalFilterStatus,
        example: ApprovalFilterStatus.CURRENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ApprovalFilterStatus),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "approvalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '참조 문서 열람 여부 필터 (RECEIVED_REFERENCE에만 적용)\n' +
            '- READ: 열람함 (status = APPROVED)\n' +
            '- UNREAD: 미열람 (status = PENDING)',
        enum: ReferenceReadStatus,
        example: ReferenceReadStatus.UNREAD,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ReferenceReadStatus),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "referenceReadStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '제목 검색어',
        example: '휴가',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "searchKeyword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '카테고리 ID',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '제출 시작 날짜 (YYYY-MM-DD)',
        example: '2025-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '제출 종료 날짜 (YYYY-MM-DD)',
        example: '2025-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMyAllDocumentsDto.prototype, "endDate", void 0);
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
], QueryMyAllDocumentsDto.prototype, "page", void 0);
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
], QueryMyAllDocumentsDto.prototype, "limit", void 0);
//# sourceMappingURL=query-my-all-documents.dto.js.map