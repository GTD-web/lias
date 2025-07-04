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
exports.MetadataResponseDto = exports.EmployeeResponseDto = exports.DepartmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DepartmentResponseDto {
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '지상기술본부' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '지상기술본부' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [DepartmentResponseDto],
        example: [
            {
                departmentId: '550e8400-e29b-41d4-a716-446655440000',
                departmentName: 'Web파트',
                departmentCode: '지상-Web',
                childrenDepartments: [],
            },
        ],
    }),
    __metadata("design:type", Array)
], DepartmentResponseDto.prototype, "childrenDepartments", void 0);
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '홍길동' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25001' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hong@lumir.space' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '지상-Web' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '파트장' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '책임연구원' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "rank", void 0);
class MetadataResponseDto {
}
exports.MetadataResponseDto = MetadataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: DepartmentResponseDto }),
    __metadata("design:type", DepartmentResponseDto)
], MetadataResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EmployeeResponseDto] }),
    __metadata("design:type", Array)
], MetadataResponseDto.prototype, "employees", void 0);
//# sourceMappingURL=metadata-response.dto.js.map