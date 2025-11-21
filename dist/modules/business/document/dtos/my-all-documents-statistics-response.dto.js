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
exports.MyAllDocumentsStatisticsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MyAllDocumentsStatisticsResponseDto {
}
exports.MyAllDocumentsStatisticsResponseDto = MyAllDocumentsStatisticsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '임시저장 (내가 기안한 문서 중 DRAFT 상태)',
        example: 1,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "DRAFT", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상신함 (내가 기안한 문서 중 제출된 전체)',
        example: 10,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "PENDING", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태)',
        example: 1,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "PENDING_AGREEMENT", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태)',
        example: 2,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "PENDING_APPROVAL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태 - 결재 완료, 시행 대기)',
        example: 1,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "IMPLEMENTATION", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기결함 (내가 기안한 문서 중 IMPLEMENTED 상태 - 시행까지 완료)',
        example: 20,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "APPROVED", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '반려함 (내가 기안한 문서 중 REJECTED 상태)',
        example: 3,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "REJECTED", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수신참조함 (내가 참조자로 있는 문서)',
        example: 23,
    }),
    __metadata("design:type", Number)
], MyAllDocumentsStatisticsResponseDto.prototype, "RECEIVED_REFERENCE", void 0);
//# sourceMappingURL=my-all-documents-statistics-response.dto.js.map