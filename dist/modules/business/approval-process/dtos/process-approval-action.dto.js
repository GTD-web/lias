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
exports.ProcessApprovalActionDto = exports.ApprovalActionType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ApprovalActionType;
(function (ApprovalActionType) {
    ApprovalActionType["APPROVE"] = "approve";
    ApprovalActionType["REJECT"] = "reject";
    ApprovalActionType["COMPLETE_AGREEMENT"] = "complete-agreement";
    ApprovalActionType["COMPLETE_IMPLEMENTATION"] = "complete-implementation";
    ApprovalActionType["CANCEL"] = "cancel";
})(ApprovalActionType || (exports.ApprovalActionType = ApprovalActionType = {}));
class ProcessApprovalActionDto {
}
exports.ProcessApprovalActionDto = ProcessApprovalActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액션 타입',
        enum: ApprovalActionType,
        example: ApprovalActionType.APPROVE,
    }),
    (0, class_validator_1.IsEnum)(ApprovalActionType),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '처리자 ID (결재자/협의자/시행자/기안자)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "approverId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '결재 단계 스냅샷 ID (approve, reject, complete-agreement, complete-implementation 타입에서 필수)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "stepSnapshotId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 ID (cancel 타입에서 필수)',
        example: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '의견 또는 사유 (reject 타입에서는 필수)',
        example: '승인합니다.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '취소 사유 (cancel 타입에서 필수)',
        example: '내용 수정이 필요하여 취소합니다.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessApprovalActionDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시행 결과 데이터 (complete-implementation 타입에서만 사용)',
        example: { result: '완료', amount: 100000 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ProcessApprovalActionDto.prototype, "resultData", void 0);
//# sourceMappingURL=process-approval-action.dto.js.map