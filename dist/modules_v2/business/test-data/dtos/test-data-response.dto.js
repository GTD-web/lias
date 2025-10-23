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
exports.TestDataResponseDto = exports.CreatedTestDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatedTestDataDto {
}
exports.CreatedTestDataDto = CreatedTestDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 Form ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "forms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 FormVersion ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "formVersions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 Document ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalLineTemplate ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalLineTemplates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalLineTemplateVersion ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalLineTemplateVersions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalStepTemplate ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalStepTemplates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalLineSnapshot ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalLineSnapshots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalStepSnapshot ID 목록', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalStepSnapshots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 ApprovalLine ID 목록 (결재선 없는 경우)', type: [String], required: false }),
    __metadata("design:type", Array)
], CreatedTestDataDto.prototype, "approvalLines", void 0);
class TestDataResponseDto {
}
exports.TestDataResponseDto = TestDataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 여부' }),
    __metadata("design:type", Boolean)
], TestDataResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '메시지' }),
    __metadata("design:type", String)
], TestDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성된 테스트 데이터', required: false }),
    __metadata("design:type", Object)
], TestDataResponseDto.prototype, "data", void 0);
//# sourceMappingURL=test-data-response.dto.js.map