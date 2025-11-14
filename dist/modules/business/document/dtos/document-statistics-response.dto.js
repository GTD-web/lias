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
exports.DocumentStatisticsResponseDto = exports.DocumentStatisticsItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentStatisticsItemDto {
}
exports.DocumentStatisticsItemDto = DocumentStatisticsItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '통계 타입',
        example: 'submitted',
    }),
    __metadata("design:type", String)
], DocumentStatisticsItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 개수',
        example: 10,
    }),
    __metadata("design:type", Number)
], DocumentStatisticsItemDto.prototype, "count", void 0);
class DocumentStatisticsResponseDto {
}
exports.DocumentStatisticsResponseDto = DocumentStatisticsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '내가 기안한 문서 통계',
        type: [DocumentStatisticsItemDto],
    }),
    __metadata("design:type", Object)
], DocumentStatisticsResponseDto.prototype, "myDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다른 사람이 기안한 문서 통계',
        type: [DocumentStatisticsItemDto],
    }),
    __metadata("design:type", Object)
], DocumentStatisticsResponseDto.prototype, "othersDocuments", void 0);
//# sourceMappingURL=document-statistics-response.dto.js.map