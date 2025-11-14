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
exports.DocumentStatisticsResponseDto = exports.OthersDocumentsStatisticsDto = exports.MyDocumentsStatisticsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MyDocumentsStatisticsDto {
}
exports.MyDocumentsStatisticsDto = MyDocumentsStatisticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '임시저장 (DRAFT)',
        example: 3,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "draft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상신 (전체 제출된 문서)',
        example: 8,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "submitted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '협의 (PENDING + AGREEMENT)',
        example: 6,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "agreement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '미결 (PENDING + APPROVAL)',
        example: 2,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "approval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기결 (APPROVED)',
        example: 0,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "approved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '반려 (REJECTED)',
        example: 0,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행 (IMPLEMENTED)',
        example: 0,
    }),
    __metadata("design:type", Number)
], MyDocumentsStatisticsDto.prototype, "implemented", void 0);
class OthersDocumentsStatisticsDto {
}
exports.OthersDocumentsStatisticsDto = OthersDocumentsStatisticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '참조 (내가 참조자로 있는 문서)',
        example: 0,
    }),
    __metadata("design:type", Number)
], OthersDocumentsStatisticsDto.prototype, "reference", void 0);
class DocumentStatisticsResponseDto {
}
exports.DocumentStatisticsResponseDto = DocumentStatisticsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '내가 기안한 문서 통계',
        type: MyDocumentsStatisticsDto,
    }),
    __metadata("design:type", MyDocumentsStatisticsDto)
], DocumentStatisticsResponseDto.prototype, "myDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다른 사람이 기안한 문서 통계',
        type: OthersDocumentsStatisticsDto,
    }),
    __metadata("design:type", OthersDocumentsStatisticsDto)
], DocumentStatisticsResponseDto.prototype, "othersDocuments", void 0);
//# sourceMappingURL=document-statistics-response.dto.js.map