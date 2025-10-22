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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const metadata_context_1 = require("../../../context/metadata/metadata.context");
const uuid_1 = require("uuid");
let MetadataQueryController = class MetadataQueryController {
    constructor(metadataContext) {
        this.metadataContext = metadataContext;
    }
    async getDepartments() {
        return await this.metadataContext.getAllDepartments();
    }
    async getEmployeesByDepartment(departmentId, activeOnly) {
        const activeOnlyBool = activeOnly === undefined || activeOnly === 'true';
        return await this.metadataContext.getEmployeesByDepartment(departmentId, activeOnlyBool);
    }
    async getDepartmentHierarchyWithEmployees(activeOnly) {
        const activeOnlyBool = activeOnly === undefined || activeOnly === 'true';
        return await this.metadataContext.getDepartmentHierarchyWithEmployees(activeOnlyBool);
    }
    async getPositions() {
        return await this.metadataContext.getAllPositions();
    }
    async getEmployees(search, departmentId) {
        if (departmentId && !(0, uuid_1.validate)(departmentId)) {
            throw new common_1.BadRequestException('departmentId는 유효한 UUID 형식이어야 합니다');
        }
        return await this.metadataContext.searchEmployees(search, departmentId);
    }
    async getEmployee(employeeId) {
        return await this.metadataContext.getEmployeeById(employeeId);
    }
};
exports.MetadataQueryController = MetadataQueryController;
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({
        summary: '부서 목록 조회',
        description: '모든 부서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 부서 조회 (id, departmentName, departmentCode 포함)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '부서 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:departmentId/employees'),
    (0, swagger_1.ApiOperation)({
        summary: '부서별 직원 조회',
        description: '특정 부서의 직원 목록을 조회합니다\n\n' +
            '**쿼리 파라미터:**\n' +
            '- activeOnly: 재직 중인 직원만 조회 (기본값: true)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 부서의 직원 목록 조회\n' +
            '- ❌ 존재하지 않는 부서 ID (404 반환)\n' +
            '- ❌ 잘못된 UUID 형식 (400 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'departmentId', description: '부서 ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'activeOnly',
        required: false,
        description: '재직 중인 직원만 조회 (기본값: true)',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '직원 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '부서를 찾을 수 없음' }),
    __param(0, (0, common_1.Param)('departmentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getEmployeesByDepartment", null);
__decorate([
    (0, common_1.Get)('departments/hierarchy/with-employees'),
    (0, swagger_1.ApiOperation)({
        summary: '계층구조 부서 및 직원 조회',
        description: '모든 부서를 계층 구조 형태로 조회하며, 각 부서의 직원 정보도 함께 반환합니다.\n\n' +
            '**쿼리 파라미터:**\n' +
            '- activeOnly: 재직 중인 직원만 조회 (기본값: true)\n\n' +
            '**응답 구조:**\n' +
            '```json\n' +
            '[\n' +
            '  {\n' +
            '    "id": "dept-uuid",\n' +
            '    "departmentName": "개발본부",\n' +
            '    "employees": [...],\n' +
            '    "children": [\n' +
            '      {\n' +
            '        "id": "subdept-uuid",\n' +
            '        "departmentName": "개발팀",\n' +
            '        "employees": [...],\n' +
            '        "children": []\n' +
            '      }\n' +
            '    ]\n' +
            '  }\n' +
            ']\n' +
            '```',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'activeOnly',
        required: false,
        description: '재직 중인 직원만 조회 (기본값: true)',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '계층구조 부서 및 직원 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Query)('activeOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getDepartmentHierarchyWithEmployees", null);
__decorate([
    (0, common_1.Get)('positions'),
    (0, swagger_1.ApiOperation)({
        summary: '직급 목록 조회',
        description: '모든 직급을 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 직급 조회 (id, positionTitle, positionCode, level 포함)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '직급 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getPositions", null);
__decorate([
    (0, common_1.Get)('employees'),
    (0, swagger_1.ApiOperation)({
        summary: '직원 검색',
        description: '이름 또는 직원번호로 직원을 검색합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 직원 조회 (필터 없음)\n' +
            '- ✅ 이름으로 검색\n' +
            '- ✅ 직원번호로 검색\n' +
            '- ✅ 부서별 필터링\n' +
            '- ✅ 검색어 + 부서 조합 필터\n' +
            '- ✅ 검색 결과 없음 (빈 배열 반환)\n' +
            '- ✅ 빈 검색어 (전체 조회와 동일)\n' +
            '- ✅ 한글, 공백, 특수문자, 긴 검색어 처리\n' +
            '- ❌ 잘못된 departmentId UUID 형식 (400 반환)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: '검색어 (이름 또는 직원번호)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', description: '부서 ID', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '직원 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId'),
    (0, swagger_1.ApiOperation)({
        summary: '직원 상세 조회',
        description: '특정 직원의 상세 정보를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 직원 상세 정보 조회\n' +
            '- ✅ 다른 직원 정보 조회\n' +
            '- ❌ 존재하지 않는 직원 ID (404 반환)\n' +
            '- ❌ 잘못된 UUID 형식 (400 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '직원 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원을 찾을 수 없음' }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetadataQueryController.prototype, "getEmployee", null);
exports.MetadataQueryController = MetadataQueryController = __decorate([
    (0, swagger_1.ApiTags)('메타데이터 조회'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [metadata_context_1.MetadataContext])
], MetadataQueryController);
//# sourceMappingURL=metadata-query.controller.js.map