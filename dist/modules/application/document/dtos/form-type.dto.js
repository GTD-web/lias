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
exports.DocumentTypeResponseDto = exports.UpdateDocumentTypeDto = exports.CreateDocumentTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDocumentTypeDto {
}
exports.CreateDocumentTypeDto = CreateDocumentTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 타입 이름',
        example: 'VACATION',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 번호 코드 (ex. 휴가, 출결, 출장 등)',
        example: 'VAC-001',
        required: true,
    }),
    __metadata("design:type", String)
], CreateDocumentTypeDto.prototype, "documentNumberCode", void 0);
class UpdateDocumentTypeDto extends (0, swagger_1.PartialType)(CreateDocumentTypeDto) {
}
exports.UpdateDocumentTypeDto = UpdateDocumentTypeDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: '문서 타입 ID',
        example: 'uuid',
        required: true,
    }),
    __metadata("design:type", String)
], UpdateDocumentTypeDto.prototype, "documentTypeId", void 0);
class DocumentTypeResponseDto {
}
exports.DocumentTypeResponseDto = DocumentTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 타입 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], DocumentTypeResponseDto.prototype, "documentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 타입 이름',
        example: 'VACATION',
    }),
    __metadata("design:type", String)
], DocumentTypeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 번호 코드',
        example: 'VAC-001',
    }),
    __metadata("design:type", String)
], DocumentTypeResponseDto.prototype, "documentNumberCode", void 0);
//# sourceMappingURL=form-type.dto.js.map