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
exports.CancelSubmitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CancelSubmitDto {
}
exports.CancelSubmitDto = CancelSubmitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '취소 사유',
        example: '내용 수정이 필요하여 상신을 취소합니다.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelSubmitDto.prototype, "reason", void 0);
//# sourceMappingURL=cancel-submit.dto.js.map