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
exports.ExportAllDataResponseDto = exports.ExportEmployeeDepartmentPositionDto = exports.ExportRankDto = exports.ExportPositionDto = exports.ExportEmployeeDto = exports.ExportDepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ExportDepartmentDto {
}
exports.ExportDepartmentDto = ExportDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], ExportDepartmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명' }),
    __metadata("design:type", String)
], ExportDepartmentDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드' }),
    __metadata("design:type", String)
], ExportDepartmentDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 유형' }),
    __metadata("design:type", String)
], ExportDepartmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상위 부서 ID', required: false }),
    __metadata("design:type", String)
], ExportDepartmentDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정렬 순서' }),
    __metadata("design:type", Number)
], ExportDepartmentDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", Date)
], ExportDepartmentDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", Date)
], ExportDepartmentDto.prototype, "updatedAt", void 0);
class ExportEmployeeDto {
}
exports.ExportEmployeeDto = ExportEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번' }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '비밀번호', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', required: false }),
    __metadata("design:type", Date)
], ExportEmployeeDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일' }),
    __metadata("design:type", Date)
], ExportEmployeeDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태' }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 직급 ID', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "currentRankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '퇴사일', required: false }),
    __metadata("design:type", Date)
], ExportEmployeeDto.prototype, "terminationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '퇴사 사유', required: false }),
    __metadata("design:type", String)
], ExportEmployeeDto.prototype, "terminationReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '초기 비밀번호 설정 여부' }),
    __metadata("design:type", Boolean)
], ExportEmployeeDto.prototype, "isInitialPasswordSet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", Date)
], ExportEmployeeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", Date)
], ExportEmployeeDto.prototype, "updatedAt", void 0);
class ExportPositionDto {
}
exports.ExportPositionDto = ExportPositionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    __metadata("design:type", String)
], ExportPositionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명' }),
    __metadata("design:type", String)
], ExportPositionDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드' }),
    __metadata("design:type", String)
], ExportPositionDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨' }),
    __metadata("design:type", Number)
], ExportPositionDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리 권한 여부' }),
    __metadata("design:type", Boolean)
], ExportPositionDto.prototype, "hasManagementAuthority", void 0);
class ExportRankDto {
}
exports.ExportRankDto = ExportRankDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID' }),
    __metadata("design:type", String)
], ExportRankDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명' }),
    __metadata("design:type", String)
], ExportRankDto.prototype, "rankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드' }),
    __metadata("design:type", String)
], ExportRankDto.prototype, "rankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨' }),
    __metadata("design:type", Number)
], ExportRankDto.prototype, "level", void 0);
class ExportEmployeeDepartmentPositionDto {
}
exports.ExportEmployeeDepartmentPositionDto = ExportEmployeeDepartmentPositionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID' }),
    __metadata("design:type", String)
], ExportEmployeeDepartmentPositionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], ExportEmployeeDepartmentPositionDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], ExportEmployeeDepartmentPositionDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    __metadata("design:type", String)
], ExportEmployeeDepartmentPositionDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 권한 여부' }),
    __metadata("design:type", Boolean)
], ExportEmployeeDepartmentPositionDto.prototype, "isManager", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", Date)
], ExportEmployeeDepartmentPositionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", Date)
], ExportEmployeeDepartmentPositionDto.prototype, "updatedAt", void 0);
class ExportAllDataResponseDto {
}
exports.ExportAllDataResponseDto = ExportAllDataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 목록', type: [ExportDepartmentDto] }),
    __metadata("design:type", Array)
], ExportAllDataResponseDto.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 목록', type: [ExportEmployeeDto] }),
    __metadata("design:type", Array)
], ExportAllDataResponseDto.prototype, "employees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 목록', type: [ExportPositionDto] }),
    __metadata("design:type", Array)
], ExportAllDataResponseDto.prototype, "positions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 목록', type: [ExportRankDto] }),
    __metadata("design:type", Array)
], ExportAllDataResponseDto.prototype, "ranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원-부서-직책 매핑 목록', type: [ExportEmployeeDepartmentPositionDto] }),
    __metadata("design:type", Array)
], ExportAllDataResponseDto.prototype, "employeeDepartmentPositions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 데이터 개수' }),
    __metadata("design:type", Object)
], ExportAllDataResponseDto.prototype, "totalCounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '조회 시각' }),
    __metadata("design:type", Date)
], ExportAllDataResponseDto.prototype, "exportedAt", void 0);
//# sourceMappingURL=export-all-data.dto.js.map