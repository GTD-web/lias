import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { TemplateService } from '../services/template.service';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto } from '../dtos/update-template.dto';
import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';

/**
 * 템플릿 관리 컨트롤러
 * 문서 템플릿과 결재단계 템플릿을 함께 관리합니다.
 */
@ApiTags('템플릿 관리')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '문서 템플릿 생성 (결재단계 포함)',
        description:
            '문서 템플릿과 결재단계 템플릿을 함께 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 생성 (결재단계 포함)\n' +
            '- ✅ 정상: 최소 필드만으로 템플릿 생성\n' +
            '- ✅ 정상: 여러 결재단계가 있는 템플릿 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (name)\n' +
            '- ❌ 실패: 필수 필드 누락 (code)\n' +
            '- ❌ 실패: 필수 필드 누락 (template)\n' +
            '- ❌ 실패: 필수 필드 누락 (approvalSteps)',
    })
    @ApiResponse({
        status: 201,
        description: '템플릿 생성 성공',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (규칙 검증 실패 등)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async createTemplate(@Body() dto: CreateTemplateDto) {
        return await this.templateService.createTemplateWithApprovalSteps(dto);
    }

    @Get()
    @ApiOperation({
        summary: '문서 템플릿 목록 조회',
        description:
            '문서 템플릿 목록을 조회합니다. 카테고리 또는 상태로 필터링 가능합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 전체 템플릿 목록 조회\n' +
            '- ✅ 정상: 카테고리별 필터링 조회\n' +
            '- ✅ 정상: 상태별 필터링 조회',
    })
    @ApiQuery({
        name: 'categoryId',
        required: false,
        description: '카테고리 ID',
    })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: DocumentTemplateStatus,
        description: '템플릿 상태',
    })
    @ApiResponse({
        status: 200,
        description: '문서 템플릿 목록 조회 성공',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getTemplates(@Query('categoryId') categoryId?: string, @Query('status') status?: DocumentTemplateStatus) {
        return await this.templateService.getTemplates(categoryId, status);
    }

    @Get(':templateId')
    @ApiOperation({
        summary: '문서 템플릿 상세 조회',
        description:
            '특정 문서 템플릿의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID\n' +
            '- ❌ 실패: 잘못된 UUID 형식',
    })
    @ApiParam({
        name: 'templateId',
        description: '문서 템플릿 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 템플릿 상세 조회 성공',
    })
    @ApiResponse({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getTemplate(@Param('templateId') templateId: string) {
        return await this.templateService.getTemplate(templateId);
    }

    @Put(':templateId')
    @ApiOperation({
        summary: '문서 템플릿 수정',
        description:
            '문서 템플릿 정보를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 수정\n' +
            '- ✅ 정상: 부분 수정 (name만)\n' +
            '- ✅ 정상: 결재단계 수정\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID',
    })
    @ApiParam({
        name: 'templateId',
        description: '문서 템플릿 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 템플릿 수정 성공',
    })
    @ApiResponse({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async updateTemplate(@Param('templateId') templateId: string, @Body() dto: UpdateTemplateDto) {
        return await this.templateService.updateTemplate(templateId, dto);
    }

    @Delete(':templateId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '문서 템플릿 삭제',
        description:
            '문서 템플릿을 삭제합니다. 연결된 결재단계 템플릿이 있으면 삭제할 수 없습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 삭제\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 삭제\n' +
            '- ❌ 실패: 연결된 결재단계 템플릿이 있는 템플릿 삭제',
    })
    @ApiParam({
        name: 'templateId',
        description: '문서 템플릿 ID',
    })
    @ApiResponse({
        status: 204,
        description: '문서 템플릿 삭제 성공',
    })
    @ApiResponse({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '연결된 결재단계 템플릿이 있어 삭제할 수 없음',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async deleteTemplate(@Param('templateId') templateId: string) {
        await this.templateService.deleteTemplate(templateId);
    }
}
