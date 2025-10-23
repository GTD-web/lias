import { Controller, Post, Delete, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateTestDataUsecase, DeleteTestDataUsecase, GenerateTokenUsecase } from '../usecases';
import {
    TestDataResponseDto,
    GenerateTokenRequestDto,
    GenerateTokenResponseDto,
    CreateTestDataRequestDto,
    TestDataScenario,
} from '../dtos';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { User } from '../../../../common/decorators/user.decorator';
import { Employee } from '../../../domain/employee/employee.entity';

/**
 * TestDataController
 *
 * 테스트 데이터 생성 및 삭제 API
 * 개발/테스트 환경에서만 사용해야 합니다.
 */
@ApiTags('테스트 데이터 관리')
@Controller()
export class TestDataController {
    constructor(
        private readonly createTestDataUsecase: CreateTestDataUsecase,
        private readonly deleteTestDataUsecase: DeleteTestDataUsecase,
        private readonly generateTokenUsecase: GenerateTokenUsecase,
    ) {}

    @Post('token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'JWT 액세스 토큰 생성',
        description: `
테스트 목적으로 JWT 액세스 토큰을 생성합니다.
직원번호 또는 이메일을 입력하여 해당 직원의 토큰을 발급받을 수 있습니다.

⚠️ 주의: 개발/테스트 환경에서만 사용하세요!
⚠️ 이 API는 인증이 필요하지 않습니다.
        `,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'JWT 토큰 생성 성공',
        type: GenerateTokenResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 (직원번호 또는 이메일 누락)' })
    @ApiResponse({ status: 404, description: '직원을 찾을 수 없음' })
    async generateToken(@Body() dto: GenerateTokenRequestDto): Promise<GenerateTokenResponseDto> {
        return await this.generateTokenUsecase.execute(dto);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '시나리오 기반 테스트 데이터 생성',
        description: `
결재 시스템에서 발생할 수 있는 다양한 시나리오의 테스트 데이터를 생성합니다.

## 📋 지원 시나리오

### 1️⃣ SIMPLE_APPROVAL (간단한 결재)
**기안자 → 부서장 → 본부장 → 완료**
- 기본적인 3단계 결재 흐름
- 기안자가 첫 번째 결재자로 포함됨

### 2️⃣ MULTI_LEVEL_APPROVAL (복잡한 다단계 결재)
**기안자 → 팀장 → 부서장 → 본부장 → 완료**
- 4단계 결재 흐름
- 순차적 결재 진행 (이전 단계 완료 필수)

### 3️⃣ AGREEMENT_PROCESS (협의 프로세스)
**기안자 → 협의자 2명 동시 검토 → 부서장 → 완료**
- 협의는 순서 무관하게 동시 진행 가능
- 모든 협의 완료 후 결재 진행

### 4️⃣ IMPLEMENTATION_PROCESS (시행 프로세스)
**기안자 → 부서장 → 시행자 실행 → 완료**
- 모든 결재 완료 후 시행 가능
- 시행 완료 시 IMPLEMENTED 상태

### 5️⃣ REJECTED_DOCUMENT (반려 시나리오)
**기안자 → 부서장 반려 → REJECTED 상태**
- 결재 중 반려 발생
- 순서가 되어야 반려 가능

### 6️⃣ CANCELLED_DOCUMENT (취소 시나리오)
**기안자 → 진행 중 기안자가 취소 → CANCELLED 상태**
- 기안자만 취소 가능
- PENDING 상태에서만 취소 가능

### 7️⃣ WITH_REFERENCE (참조자 포함)
**기안자 → 결재 진행 → 참조자들에게 알림**
- 참조자는 처리 불필요
- 열람만 가능

### 8️⃣ PARALLEL_AGREEMENT (병렬 협의)
**기안자 → 여러 부서 동시 협의 → 최종 승인**
- 여러 협의자가 동시 협의
- 모든 협의 완료 후 결재 진행

### 9️⃣ FULL_PROCESS (전체 프로세스)
**기안자 → 협의 → 결재 → 시행 → 참조 (모든 단계 포함)**
- 모든 유형의 단계가 포함된 종합 시나리오
- 실제 업무 프로세스와 가장 유사

### 🔟 NO_APPROVAL_LINE (결재선 없는 양식)
**결재선이 없는 양식으로 문서 생성 → 자동 결재선 생성**
- 양식에 결재선이 연결되지 않은 상태
- 문서 제출 시 자동으로 계층적 결재선 생성
- 기안자 → 부서장 → 상위 부서장 → 최상위까지 자동 생성

## 🎛️ 추가 옵션
- **documentCount**: 생성할 문서 개수 (1-10)
- **titlePrefix**: 문서 제목 접두사
- **progress**: 시나리오 진행 정도 (0: 초기/DRAFT, 50: 중간/진행중, 100: 완료)

## 🔒 순서 검증 규칙
1. **협의**: 순서 무관, 동시 진행 가능
2. **결재**: 협의 완료 + 이전 결재 완료 필수
3. **시행**: 모든 협의 + 모든 결재 완료 필수
4. **반려**: 협의 완료 + 이전 결재 완료 필수

⚠️ **주의**: 개발/테스트 환경에서만 사용하세요!
        `,
    })
    @ApiBody({
        schema: {
            type: 'object',
            required: ['scenario'],
            properties: {
                scenario: {
                    type: 'string',
                    enum: Object.values(TestDataScenario),
                    description: '생성할 테스트 데이터 시나리오',
                },
                documentCount: {
                    type: 'number',
                    minimum: 1,
                    maximum: 10,
                    default: 1,
                    description: '생성할 문서 개수',
                },
                titlePrefix: {
                    type: 'string',
                    description: '문서 제목 접두사',
                },
                progress: {
                    type: 'number',
                    minimum: 0,
                    maximum: 100,
                    description: '시나리오 진행 정도 (0: 초기, 50: 중간, 100: 완료)',
                },
            },
            examples: [
                {
                    scenario: TestDataScenario.SIMPLE_APPROVAL,
                    documentCount: 1,
                    titlePrefix: '지출 결의서',
                    progress: 0,
                },
            ],
        },
        examples: {
            simple: {
                summary: '✅ 간단한 2단계 결재',
                description: '부서장 -> 본부장 승인 프로세스',
                value: {
                    scenario: TestDataScenario.SIMPLE_APPROVAL,
                    documentCount: 1,
                    titlePrefix: '지출 결의서',
                    progress: 0,
                },
            },
            multiLevel: {
                summary: '🔄 복잡한 다단계 결재',
                description: '팀장 -> 부서장 -> 본부장 -> 임원까지 4단계 결재',
                value: {
                    scenario: TestDataScenario.MULTI_LEVEL_APPROVAL,
                    documentCount: 1,
                    titlePrefix: '예산 신청서',
                    progress: 25,
                },
            },
            agreement: {
                summary: '🤝 협의 프로세스',
                description: '협의자 2명이 검토 후 부서장 승인',
                value: {
                    scenario: TestDataScenario.AGREEMENT_PROCESS,
                    documentCount: 1,
                    titlePrefix: '구매 요청서',
                    progress: 0,
                },
            },
            implementation: {
                summary: '⚙️ 시행 프로세스',
                description: '승인 후 시행자가 실제 실행',
                value: {
                    scenario: TestDataScenario.IMPLEMENTATION_PROCESS,
                    documentCount: 1,
                    titlePrefix: '계약서',
                    progress: 50,
                },
            },
            rejected: {
                summary: '❌ 반려된 문서',
                description: '1단계에서 반려된 상태',
                value: {
                    scenario: TestDataScenario.REJECTED_DOCUMENT,
                    documentCount: 1,
                    titlePrefix: '휴가 신청서',
                    progress: 100,
                },
            },
            cancelled: {
                summary: '🚫 취소된 문서',
                description: '기안자가 진행 중 취소',
                value: {
                    scenario: TestDataScenario.CANCELLED_DOCUMENT,
                    documentCount: 1,
                    titlePrefix: '출장 신청서',
                    progress: 100,
                },
            },
            withReference: {
                summary: '👥 참조자 포함',
                description: '결재 진행 + 참조자들에게 알림',
                value: {
                    scenario: TestDataScenario.WITH_REFERENCE,
                    documentCount: 1,
                    titlePrefix: '공지사항',
                    progress: 0,
                },
            },
            parallelAgreement: {
                summary: '🔀 병렬 협의',
                description: '여러 부서가 동시에 협의',
                value: {
                    scenario: TestDataScenario.PARALLEL_AGREEMENT,
                    documentCount: 1,
                    titlePrefix: '프로젝트 제안서',
                    progress: 0,
                },
            },
            fullProcess: {
                summary: '🎯 전체 프로세스',
                description: '협의 -> 결재 -> 시행 -> 참조 (모든 단계)',
                value: {
                    scenario: TestDataScenario.FULL_PROCESS,
                    documentCount: 1,
                    titlePrefix: '종합 테스트',
                    progress: 0,
                },
            },
            noApprovalLine: {
                summary: '🔧 결재선 없는 양식',
                description: '자동 결재선 생성 테스트',
                value: {
                    scenario: TestDataScenario.NO_APPROVAL_LINE,
                    documentCount: 1,
                    titlePrefix: '자동 결재선 테스트',
                    progress: 0,
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '테스트 데이터 생성 성공',
        type: TestDataResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async createTestData(@User() user: Employee, @Body() dto: CreateTestDataRequestDto): Promise<TestDataResponseDto> {
        return await this.createTestDataUsecase.execute(user.id, dto);
    }

    @Delete('documents')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '모든 문서 및 결재 프로세스 삭제',
        description: `
모든 문서, 결재 스냅샷, 결재 단계를 삭제합니다.

**삭제 대상:**
- 📄 모든 문서 (Documents)
- 📸 결재선 스냅샷 (ApprovalLineSnapshots)
- 📋 결재 단계 스냅샷 (ApprovalStepSnapshots)

**주의사항:**
- ⚠️ 이 작업은 되돌릴 수 없습니다
- ⚠️ 개발/테스트 환경에서만 사용하세요
- ⚠️ 실제 운영 데이터도 모두 삭제됩니다
        `,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '문서 및 결재 프로세스 삭제 성공',
        type: TestDataResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async deleteAllDocuments(): Promise<TestDataResponseDto> {
        return await this.deleteTestDataUsecase.deleteAllDocuments();
    }

    @Delete('forms-and-templates')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '모든 결재선 및 양식 삭제',
        description: `
모든 결재선 템플릿, 문서 양식, 관련 버전을 삭제합니다.

**삭제 대상:**
- 📋 문서양식 (Forms)
- 📝 문서양식 버전 (FormVersions)
- 🔗 양식-결재선 연결 (FormVersionApprovalLineTemplateVersions)
- 📜 결재선 템플릿 (ApprovalLineTemplates)
- 📜 결재선 템플릿 버전 (ApprovalLineTemplateVersions)
- 📌 결재 단계 템플릿 (ApprovalStepTemplates)

**주의사항:**
- ⚠️ 이 작업은 되돌릴 수 없습니다
- ⚠️ 개발/테스트 환경에서만 사용하세요
- ⚠️ 실제 운영 데이터도 모두 삭제됩니다
- ⚠️ 문서가 먼저 삭제되어야 합니다 (외래키 제약)
        `,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '결재선 및 양식 삭제 성공',
        type: TestDataResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 400, description: '문서가 먼저 삭제되지 않음 (외래키 제약)' })
    async deleteAllFormsAndTemplates(): Promise<TestDataResponseDto> {
        return await this.deleteTestDataUsecase.deleteAllFormsAndTemplates();
    }

    @Delete('all')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '모든 테스트 데이터 삭제 (전체)',
        description: `
모든 테스트 데이터를 한 번에 삭제합니다.
(문서 + 결재 프로세스 + 결재선 + 양식)

**삭제 순서:**
1. 문서 및 결재 프로세스
2. 결재선 및 양식

**주의사항:**
- ⚠️ 이 작업은 되돌릴 수 없습니다
- ⚠️ 개발/테스트 환경에서만 사용하세요
- ⚠️ 실제 운영 데이터도 모두 삭제됩니다
- 🔴 **매우 위험한 작업입니다!**
        `,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '모든 테스트 데이터 삭제 성공',
        type: TestDataResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async deleteAllTestData(): Promise<TestDataResponseDto> {
        return await this.deleteTestDataUsecase.deleteAll();
    }
}
