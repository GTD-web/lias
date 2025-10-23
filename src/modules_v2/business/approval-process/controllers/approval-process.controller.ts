import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import {
    ApproveStepRequestDto,
    RejectStepRequestDto,
    CompleteAgreementRequestDto,
    CompleteImplementationRequestDto,
    CancelApprovalRequestDto,
    ApprovalStepResponseDto,
    DocumentApprovalStatusResponseDto,
} from '../dtos';
import {
    ApproveStepUsecase,
    RejectStepUsecase,
    CompleteAgreementUsecase,
    CompleteImplementationUsecase,
    CancelApprovalUsecase,
    GetApprovalStatusUsecase,
} from '../usecases';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { User } from '../../../../common/decorators/user.decorator';
import { Employee } from '../../../domain/employee/employee.entity';

@ApiTags('결재 프로세스')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ApprovalProcessController {
    constructor(
        private readonly approveStepUsecase: ApproveStepUsecase,
        private readonly rejectStepUsecase: RejectStepUsecase,
        private readonly completeAgreementUsecase: CompleteAgreementUsecase,
        private readonly completeImplementationUsecase: CompleteImplementationUsecase,
        private readonly cancelApprovalUsecase: CancelApprovalUsecase,
        private readonly getApprovalStatusUsecase: GetApprovalStatusUsecase,
    ) {}

    @Post('approve')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재 승인',
        description:
            '결재 단계를 승인합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 협의가 있다면 모든 협의가 완료되어야 결재 가능\n' +
            '2. 이전 결재 단계가 완료되어야 현재 단계 승인 가능\n\n' +
            '**AssigneeRule별 권한 검증:**\n' +
            '- FIXED: 지정된 고정 결재자만 승인 가능\n' +
            '- DRAFTER: 기안자 본인만 승인 가능\n' +
            '- DRAFTER_SUPERIOR: 기안자의 상급자만 승인 가능\n' +
            '- DEPARTMENT_HEAD: 해당 부서의 부서장만 승인 가능\n' +
            '- POSITION_BASED: 해당 직책의 담당자만 승인 가능\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 승인 (의견 포함)\n' +
            '- ✅ 정상: 의견 없이 승인\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 실패: 권한 없는 사용자(기안자)가 승인 시도 (403 반환)\n' +
            '- ❌ 실패: 이미 승인된 단계 재승인 시도 (400 반환)\n' +
            '- ❌ 실패: 협의가 완료되지 않은 상태에서 결재 시도 (400 반환)\n' +
            '- ❌ 실패: 첫 번째 결재가 완료되지 않은 상태에서 두 번째 결재 시도 (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '결재 승인 성공', type: ApprovalStepResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청 (순서 위반 포함)' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 403, description: '권한 없음' })
    @ApiResponse({ status: 404, description: '결재 단계를 찾을 수 없음' })
    async approveStep(@User() user: Employee, @Body() dto: ApproveStepRequestDto): Promise<ApprovalStepResponseDto> {
        return await this.approveStepUsecase.execute(user.id, dto);
    }

    @Post('reject')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재 반려',
        description:
            '결재 단계를 반려합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 협의가 있다면 모든 협의가 완료되어야 반려 가능\n' +
            '2. 이전 결재 단계가 완료되어야 현재 단계 반려 가능\n' +
            '(반려도 차례가 되어야 가능)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 반려 (사유 포함)\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 실패: 필수 필드 누락 (comment - 반려 사유)\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 실패: 권한 없는 사용자가 반려 시도 (403 반환)\n' +
            '- ❌ 실패: 협의가 완료되지 않은 상태에서 결재 반려 시도 (400 반환)\n' +
            '- ❌ 실패: 첫 번째 결재가 완료되지 않은 상태에서 두 번째 결재 반려 시도 (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '결재 반려 성공', type: ApprovalStepResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청 (반려 사유 필수, 순서 위반 포함)' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 403, description: '권한 없음' })
    @ApiResponse({ status: 404, description: '결재 단계를 찾을 수 없음' })
    async rejectStep(@User() user: Employee, @Body() dto: RejectStepRequestDto): Promise<ApprovalStepResponseDto> {
        return await this.rejectStepUsecase.execute(user.id, dto);
    }

    @Post('agreement/complete')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '협의 완료',
        description:
            '협의 단계를 완료 처리합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 협의 완료 (의견 포함)\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '협의 완료 성공', type: ApprovalStepResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 403, description: '권한 없음' })
    @ApiResponse({ status: 404, description: '협의 단계를 찾을 수 없음' })
    async completeAgreement(
        @User() user: Employee,
        @Body() dto: CompleteAgreementRequestDto,
    ): Promise<ApprovalStepResponseDto> {
        return await this.completeAgreementUsecase.execute(user.id, dto);
    }

    @Post('implementation/complete')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '시행 완료',
        description:
            '시행 단계를 완료 처리합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 모든 협의가 완료되어야 시행 가능\n' +
            '2. 모든 결재가 완료되어야 시행 가능\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 시행 완료 (의견 포함)\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 실패: 협의가 완료되지 않은 상태에서 시행 시도 (400 반환)\n' +
            '- ❌ 실패: 결재가 완료되지 않은 상태에서 시행 시도 (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '시행 완료 성공', type: ApprovalStepResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청 (순서 위반 포함)' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 403, description: '권한 없음' })
    @ApiResponse({ status: 404, description: '시행 단계를 찾을 수 없음' })
    async completeImplementation(
        @User() user: Employee,
        @Body() dto: CompleteImplementationRequestDto,
    ): Promise<ApprovalStepResponseDto> {
        return await this.completeImplementationUsecase.execute(user.id, dto);
    }

    @Post('cancel')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재 취소',
        description:
            '문서 결재를 취소합니다 (기안자만 가능)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 기안자가 결재 취소\n' +
            '- ❌ 실패: 필수 필드 누락 (documentId)\n' +
            '- ❌ 실패: 필수 필드 누락 (reason)\n' +
            '- ❌ 실패: 기안자가 아닌 사용자가 취소 시도 (403 반환)\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '결재 취소 성공' })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 403, description: '권한 없음' })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async cancelApproval(@User() user: Employee, @Body() dto: CancelApprovalRequestDto) {
        return await this.cancelApprovalUsecase.execute(user.id, dto);
    }

    @Get('my-pending')
    @ApiOperation({
        summary: '내 결재 대기 목록 (실제 처리 가능한 건만)',
        description:
            '나에게 할당된 결재 대기 건 중 실제 처리 가능한 건만 조회합니다\n\n' +
            '**필터링 규칙:**\n' +
            '1. 협의: 언제나 처리 가능 (순서 무관)\n' +
            '2. 결재: 협의 완료 + 이전 결재 완료된 건만\n' +
            '3. 시행: 모든 협의 + 모든 결재 완료된 건만\n' +
            '4. 참조: 처리 불필요 (목록에서 제외)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 내 결재 대기 목록 조회\n' +
            '- ✅ 정상: 기안자는 본인의 결재 대기 목록 (빈 배열 가능)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '결재 대기 목록 조회 성공', type: [ApprovalStepResponseDto] })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getMyPendingApprovals(@User() user: Employee): Promise<ApprovalStepResponseDto[]> {
        return await this.getApprovalStatusUsecase.getMyPendingApprovals(user.id);
    }

    @Get('document/:documentId/steps')
    @ApiOperation({
        summary: '문서의 결재 단계 조회',
        description:
            '특정 문서의 모든 결재 단계를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서의 모든 결재 단계 조회\n' +
            '- ✅ 정상: 다른 사용자도 결재 단계 조회 가능\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'documentId', description: '문서 ID' })
    @ApiResponse({ status: 200, description: '결재 단계 조회 성공', type: DocumentApprovalStatusResponseDto })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async getApprovalSteps(@Param('documentId') documentId: string): Promise<DocumentApprovalStatusResponseDto> {
        return await this.getApprovalStatusUsecase.getApprovalSteps(documentId);
    }
}
