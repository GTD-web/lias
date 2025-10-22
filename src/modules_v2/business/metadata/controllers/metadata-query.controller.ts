import { Controller, Get, Query, UseGuards, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { MetadataContext } from '../../../context/metadata/metadata.context';
import { validate as isUUID } from 'uuid';

/**
 * 메타데이터 조회 컨트롤러
 * 부서, 직원, 직급, 결재선 템플릿, 문서양식 등의 메타데이터를 조회합니다.
 */
@ApiTags('메타데이터 조회')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MetadataQueryController {
    constructor(private readonly metadataContext: MetadataContext) {}

    @Get('departments')
    @ApiOperation({
        summary: '부서 목록 조회',
        description:
            '모든 부서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 부서 조회 (id, departmentName, departmentCode 포함)',
    })
    @ApiResponse({ status: 200, description: '부서 목록 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getDepartments() {
        return await this.metadataContext.getAllDepartments();
    }

    @Get('departments/:departmentId/employees')
    @ApiOperation({
        summary: '부서별 직원 조회',
        description:
            '특정 부서의 직원 목록을 조회합니다\n\n' +
            '**쿼리 파라미터:**\n' +
            '- activeOnly: 재직 중인 직원만 조회 (기본값: true)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 부서의 직원 목록 조회\n' +
            '- ❌ 존재하지 않는 부서 ID (404 반환)\n' +
            '- ❌ 잘못된 UUID 형식 (400 반환)',
    })
    @ApiParam({ name: 'departmentId', description: '부서 ID' })
    @ApiQuery({
        name: 'activeOnly',
        required: false,
        description: '재직 중인 직원만 조회 (기본값: true)',
        type: Boolean,
    })
    @ApiResponse({ status: 200, description: '직원 목록 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '부서를 찾을 수 없음' })
    async getEmployeesByDepartment(
        @Param('departmentId', ParseUUIDPipe) departmentId: string,
        @Query('activeOnly') activeOnly?: string,
    ) {
        const activeOnlyBool = activeOnly === undefined || activeOnly === 'true';
        return await this.metadataContext.getEmployeesByDepartment(departmentId, activeOnlyBool);
    }

    @Get('departments/hierarchy/with-employees')
    @ApiOperation({
        summary: '계층구조 부서 및 직원 조회',
        description:
            '모든 부서를 계층 구조 형태로 조회하며, 각 부서의 직원 정보도 함께 반환합니다.\n\n' +
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
    })
    @ApiQuery({
        name: 'activeOnly',
        required: false,
        description: '재직 중인 직원만 조회 (기본값: true)',
        type: Boolean,
    })
    @ApiResponse({ status: 200, description: '계층구조 부서 및 직원 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getDepartmentHierarchyWithEmployees(@Query('activeOnly') activeOnly?: string) {
        const activeOnlyBool = activeOnly === undefined || activeOnly === 'true';
        return await this.metadataContext.getDepartmentHierarchyWithEmployees(activeOnlyBool);
    }

    @Get('positions')
    @ApiOperation({
        summary: '직급 목록 조회',
        description:
            '모든 직급을 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 직급 조회 (id, positionTitle, positionCode, level 포함)',
    })
    @ApiResponse({ status: 200, description: '직급 목록 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getPositions() {
        return await this.metadataContext.getAllPositions();
    }

    @Get('employees')
    @ApiOperation({
        summary: '직원 검색',
        description:
            '이름 또는 직원번호로 직원을 검색합니다\n\n' +
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
    })
    @ApiQuery({ name: 'search', description: '검색어 (이름 또는 직원번호)', required: false })
    @ApiQuery({ name: 'departmentId', description: '부서 ID', required: false })
    @ApiResponse({ status: 200, description: '직원 목록 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getEmployees(@Query('search') search?: string, @Query('departmentId') departmentId?: string) {
        // departmentId가 제공된 경우 UUID 유효성 검증
        if (departmentId && !isUUID(departmentId)) {
            throw new BadRequestException('departmentId는 유효한 UUID 형식이어야 합니다');
        }
        return await this.metadataContext.searchEmployees(search, departmentId);
    }

    @Get('employees/:employeeId')
    @ApiOperation({
        summary: '직원 상세 조회',
        description:
            '특정 직원의 상세 정보를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 직원 상세 정보 조회\n' +
            '- ✅ 다른 직원 정보 조회\n' +
            '- ❌ 존재하지 않는 직원 ID (404 반환)\n' +
            '- ❌ 잘못된 UUID 형식 (400 반환)',
    })
    @ApiParam({ name: 'employeeId', description: '직원 ID' })
    @ApiResponse({ status: 200, description: '직원 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '직원을 찾을 수 없음' })
    async getEmployee(@Param('employeeId', ParseUUIDPipe) employeeId: string) {
        return await this.metadataContext.getEmployeeById(employeeId);
    }
}
