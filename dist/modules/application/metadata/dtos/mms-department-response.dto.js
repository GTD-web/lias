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
exports.MMSDepartmentWebhookRequestDto = exports.MMSDepartmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MMSDepartmentResponseDto {
    constructor(department) {
        this.department_code = department.department_code;
        this.department_name = department.department_name;
        this.child_departments = department.child_departments;
    }
}
exports.MMSDepartmentResponseDto = MMSDepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드', example: '1234567890' }),
    __metadata("design:type", String)
], MMSDepartmentResponseDto.prototype, "department_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 이름', example: '부서 이름' }),
    __metadata("design:type", String)
], MMSDepartmentResponseDto.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자식 부서', type: [MMSDepartmentResponseDto] }),
    __metadata("design:type", Array)
], MMSDepartmentResponseDto.prototype, "child_departments", void 0);
class MMSDepartmentWebhookRequestDto {
}
exports.MMSDepartmentWebhookRequestDto = MMSDepartmentWebhookRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이벤트 타입', example: 'employee.updated' }),
    __metadata("design:type", String)
], MMSDepartmentWebhookRequestDto.prototype, "event_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '엔티티 타입', example: 'employee' }),
    __metadata("design:type", String)
], MMSDepartmentWebhookRequestDto.prototype, "entity_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '타임스탬프', example: '2025-04-29T02:11:51.794Z' }),
    __metadata("design:type", String)
], MMSDepartmentWebhookRequestDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '페이로드' }),
    __metadata("design:type", MMSDepartmentResponseDto)
], MMSDepartmentWebhookRequestDto.prototype, "payload", void 0);
//# sourceMappingURL=mms-department-response.dto.js.map