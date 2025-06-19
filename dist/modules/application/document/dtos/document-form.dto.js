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
exports.DocumentFormResponseDto = exports.UpdateDocumentFormDto = exports.CreateDocumentFormDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const approval_line_dto_1 = require("./approval-line.dto");
const form_type_dto_1 = require("./form-type.dto");
class CreateDocumentFormDto {
}
exports.CreateDocumentFormDto = CreateDocumentFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 이름',
        example: '휴가신청서',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentFormDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 설명',
        example: '휴가 신청을 위한 문서 양식입니다.',
        required: false,
    }),
    __metadata("design:type", String)
], CreateDocumentFormDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 html',
        example: '<div>문서 양식 템플릿</div>',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentFormDto.prototype, "template", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '수신 및 참조자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
        required: true,
    }),
    __metadata("design:type", Array)
], CreateDocumentFormDto.prototype, "receiverInfo", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '시행자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
        required: true,
    }),
    __metadata("design:type", Array)
], CreateDocumentFormDto.prototype, "implementerInfo", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 타입 ID',
        example: 'uuid',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentFormDto.prototype, "documentTypeId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '결재선 ID',
        example: 'uuid',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentFormDto.prototype, "formApprovalLineId", void 0);
class UpdateDocumentFormDto extends (0, swagger_1.PartialType)(CreateDocumentFormDto) {
}
exports.UpdateDocumentFormDto = UpdateDocumentFormDto;
class DocumentFormResponseDto {
}
exports.DocumentFormResponseDto = DocumentFormResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentFormResponseDto.prototype, "documentFormId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 이름',
        example: '휴가신청서',
    }),
    __metadata("design:type", String)
], DocumentFormResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 설명',
        example: '휴가 신청을 위한 문서 양식입니다.',
    }),
    __metadata("design:type", String)
], DocumentFormResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 html',
        example: '<div>문서 양식 템플릿</div>',
    }),
    __metadata("design:type", String)
], DocumentFormResponseDto.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수신 및 참조자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
    }),
    __metadata("design:type", Array)
], DocumentFormResponseDto.prototype, "receiverInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시행자 정보 객체',
        example: [{ employeeId: 'uuid', name: '홍길동', rank: '사원' }],
    }),
    __metadata("design:type", Array)
], DocumentFormResponseDto.prototype, "implementerInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 양식 타입 ID',
        example: 'uuid',
    }),
    __metadata("design:type", form_type_dto_1.DocumentTypeResponseDto)
], DocumentFormResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: approval_line_dto_1.FormApprovalLineResponseDto,
        description: '결재선',
    }),
    __metadata("design:type", approval_line_dto_1.FormApprovalLineResponseDto)
], DocumentFormResponseDto.prototype, "formApprovalLine", void 0);
//# sourceMappingURL=document-form.dto.js.map