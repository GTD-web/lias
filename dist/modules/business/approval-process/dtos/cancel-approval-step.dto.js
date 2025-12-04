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
exports.CancelApprovalStepDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CancelApprovalStepDto {
}
exports.CancelApprovalStepDto = CancelApprovalStepDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '취소할 결재 단계 ID',
        example: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CancelApprovalStepDto.prototype, "stepSnapshotId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '취소 사유 (선택)',
        example: '결재 내용을 재검토하기 위해 취소합니다.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelApprovalStepDto.prototype, "reason", void 0);
//# sourceMappingURL=cancel-approval-step.dto.js.map