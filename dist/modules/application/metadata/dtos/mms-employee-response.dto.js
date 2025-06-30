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
exports.MMSEmployeeWebhookRequestDto = exports.MMSEmployeeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MMSEmployeeResponseDto {
    constructor(employee) {
        this.id = employee.id;
        this.employee_number = employee.employee_number;
        this.name = employee.name;
        this.email = employee.email;
        this.phone_number = employee.phone_number;
        this.date_of_birth = employee.date_of_birth;
        this.gender = employee.gender;
        this.hire_date = employee.hire_date;
        this.status = employee.status;
        this.department = employee.department?.department_code;
        this.position = employee.position?.position_title;
        this.rank = employee.rank?.rank_name;
    }
}
exports.MMSEmployeeResponseDto = MMSEmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID', example: '67d116b591e5366c327915d2' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: '24020' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "employee_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '구석현' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'koo.sukhyun@lumir.space' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '010-1234-5678' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', example: '1980-07-04T00:00:00.000Z' }),
    __metadata("design:type", Date)
], MMSEmployeeResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2024-05-21T00:00:00.000Z' }),
    __metadata("design:type", Date)
], MMSEmployeeResponseDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급', example: '대표이사' }),
    __metadata("design:type", String)
], MMSEmployeeResponseDto.prototype, "rank", void 0);
class MMSEmployeeWebhookRequestDto {
}
exports.MMSEmployeeWebhookRequestDto = MMSEmployeeWebhookRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이벤트 타입', example: 'employee.updated' }),
    __metadata("design:type", String)
], MMSEmployeeWebhookRequestDto.prototype, "event_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '엔티티 타입', example: 'employee' }),
    __metadata("design:type", String)
], MMSEmployeeWebhookRequestDto.prototype, "entity_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '타임스탬프', example: '2025-04-29T02:11:51.794Z' }),
    __metadata("design:type", String)
], MMSEmployeeWebhookRequestDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '페이로드' }),
    __metadata("design:type", MMSEmployeeResponseDto)
], MMSEmployeeWebhookRequestDto.prototype, "payload", void 0);
//# sourceMappingURL=mms-employee-response.dto.js.map