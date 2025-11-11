import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { TemplateService } from '../services/template.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

/**
 * 카테고리 관리 컨트롤러
 */
@ApiTags('카테고리 관리')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
    constructor(private readonly templateService: TemplateService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '카테고리 생성',
        description:
            '새로운 카테고리를 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 생성\n' +
            '- ✅ 정상: 최소 필드만으로 카테고리 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (name)\n' +
            '- ❌ 실패: 필수 필드 누락 (code)\n' +
            '- ❌ 실패: 중복된 코드',
    })
    @ApiResponse({
        status: 201,
        description: '카테고리 생성 성공',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (코드 중복 등)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async createCategory(@Body() dto: CreateCategoryDto) {
        return await this.templateService.createCategory(dto);
    }

    @Get()
    @ApiOperation({
        summary: '카테고리 목록 조회',
        description:
            '모든 카테고리 목록을 조회합니다. 정렬 순서대로 반환됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 목록 조회',
    })
    @ApiResponse({
        status: 200,
        description: '카테고리 목록 조회 성공',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getCategories() {
        return await this.templateService.getCategories();
    }

    @Get(':categoryId')
    @ApiOperation({
        summary: '카테고리 상세 조회',
        description:
            '특정 카테고리의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 ID\n' +
            '- ❌ 실패: 잘못된 UUID 형식',
    })
    @ApiParam({
        name: 'categoryId',
        description: '카테고리 ID',
    })
    @ApiResponse({
        status: 200,
        description: '카테고리 상세 조회 성공',
    })
    @ApiResponse({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getCategory(@Param('categoryId') categoryId: string) {
        return await this.templateService.getCategory(categoryId);
    }

    @Put(':categoryId')
    @ApiOperation({
        summary: '카테고리 수정',
        description:
            '카테고리 정보를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 수정\n' +
            '- ✅ 정상: 부분 수정 (name만)\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 ID',
    })
    @ApiParam({
        name: 'categoryId',
        description: '카테고리 ID',
    })
    @ApiResponse({
        status: 200,
        description: '카테고리 수정 성공',
    })
    @ApiResponse({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (코드 중복 등)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async updateCategory(@Param('categoryId') categoryId: string, @Body() dto: UpdateCategoryDto) {
        return await this.templateService.updateCategory(categoryId, dto);
    }

    @Delete(':categoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '카테고리 삭제',
        description:
            '카테고리를 삭제합니다. 연결된 문서 템플릿이 있으면 삭제할 수 없습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 삭제\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 삭제\n' +
            '- ❌ 실패: 연결된 템플릿이 있는 카테고리 삭제',
    })
    @ApiParam({
        name: 'categoryId',
        description: '카테고리 ID',
    })
    @ApiResponse({
        status: 204,
        description: '카테고리 삭제 성공',
    })
    @ApiResponse({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '연결된 문서 템플릿이 있어 삭제할 수 없음',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async deleteCategory(@Param('categoryId') categoryId: string) {
        await this.templateService.deleteCategory(categoryId);
    }
}
