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
exports.QueryMyPendingDto = exports.MyPendingType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var MyPendingType;
(function (MyPendingType) {
    MyPendingType["SUBMITTED"] = "SUBMITTED";
    MyPendingType["AGREEMENT"] = "AGREEMENT";
    MyPendingType["APPROVAL"] = "APPROVAL";
})(MyPendingType || (exports.MyPendingType = MyPendingType = {}));
class QueryMyPendingDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.QueryMyPendingDto = QueryMyPendingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 ID (기안자 또는 결재자)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryMyPendingDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '조회 타입 (상신/합의/미결)',
        enum: MyPendingType,
        example: MyPendingType.APPROVAL,
    }),
    (0, class_validator_1.IsEnum)(MyPendingType),
    __metadata("design:type", String)
], QueryMyPendingDto.prototype, "type", void 0);
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
], QueryMyPendingDto.prototype, "page", void 0);
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
], QueryMyPendingDto.prototype, "limit", void 0);
//# sourceMappingURL=query-my-pending.dto.js.map