import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateExternalDocumentRequestDto, DocumentResponseDto } from '../dtos';
import { CreateExternalDocumentUsecase } from '../usecases';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { User } from '../../../../common/decorators/user.decorator';
import { Employee } from '../../../domain/employee/employee.entity';

/**
 * 외부 문서 관리 컨트롤러
 * 외부 시스템에서 양식 선택 없이 문서를 생성하는 전용 API
 */
@ApiTags('외부 문서 관리')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('external')
export class ExternalDocumentController {
    constructor(private readonly createExternalDocumentUsecase: CreateExternalDocumentUsecase) {}

    @Post()
    @ApiOperation({
        summary: '외부 문서 생성 (양식 선택 없음)',
        description:
            '외부 시스템에서 문서를 직접 생성합니다. 양식 선택 없이 문서 제목과 내용만으로 생성됩니다.\n\n' +
            '**주요 특징:**\n' +
            '- formVersionId가 필요 없습니다\n' +
            '- customApprovalSteps로 결재선을 지정할 수 있습니다\n' +
            '- 결재선이 지정되면 문서 생성 시 즉시 스냅샷이 생성됩니다\n' +
            '- 외부 시스템 통합에 최적화된 API입니다\n\n' +
            '**결재선 처리:**\n' +
            '- customApprovalSteps가 있으면 해당 결재선으로 스냅샷 생성\n' +
            '- customApprovalSteps가 없으면 자동 계층적 결재선 생성\n' +
            '- 양식이 없으므로 외부 문서용 결재선 처리 로직 사용\n\n' +
            '**문서 상태:**\n' +
            '- 문서 생성 후 즉시 PENDING 상태로 변경\n' +
            '- 결재 프로세스가 자동으로 시작됩니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 외부 문서 생성 (양식 없음)\n' +
            '- ✅ 정상: 외부 문서 생성 + 결재선 지정\n' +
            '- ✅ 정상: customApprovalSteps로 결재선 커스터마이징\n' +
            '- ✅ 정상: 자동 계층적 결재선 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (title, content)\n' +
            '- ❌ 실패: 기안자 부서 정보 없음\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 201, description: '외부 문서 생성 성공', type: DocumentResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async createExternalDocument(
        @User() user: Employee,
        @Body() dto: CreateExternalDocumentRequestDto,
    ): Promise<DocumentResponseDto> {
        return await this.createExternalDocumentUsecase.execute(user.id, dto);
    }
}
