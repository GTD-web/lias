import { Controller, Post, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRandomDocumentsUseCase } from '../usecases/test/create-random-documents.usecase';

@ApiTags('랜덤 문서 생성')
// @ApiBearerAuth()
@Controller('api/v2/approval/random-documents')
export class RandomDocumentsController {
    constructor(private readonly createRandomDocumentsUseCase: CreateRandomDocumentsUseCase) {}

    @Post()
    @ApiOperation({
        summary: '랜덤 문서 생성',
        description: '랜덤한 사용자들이 랜덤한 기안문서를 상신한 데이터를 생성합니다.',
    })
    @ApiQuery({ name: 'count', required: false, description: '생성할 문서 개수 (기본값: 20)', type: Number })
    @ApiResponse({ status: 201, description: '랜덤 문서 생성 성공' })
    @ApiResponse({ status: 500, description: '서버 오류' })
    async createRandomDocuments(@Query('count') count?: number) {
        const result = await this.createRandomDocumentsUseCase.execute(count || 20);

        return {
            message: '랜덤 문서 생성이 완료되었습니다.',
            data: {
                createdCount: result.documents.length,
                employees: result.employees.length,
                departments: result.departments.length,
                documentTypes: result.documentTypes.length,
                documentForms: result.documentForms.length,
                approvalSteps: result.approvalSteps.length,
            },
            details: {
                documents: result.documents.map((doc) => ({
                    documentId: doc.documentId,
                    title: doc.title,
                    status: doc.status,
                    drafterId: doc.drafterId,
                    createdAt: doc.createdAt,
                })),
            },
        };
    }

    @Delete()
    @ApiOperation({ summary: '랜덤 문서 삭제', description: '생성된 랜덤 문서들을 모두 삭제합니다.' })
    @ApiResponse({ status: 200, description: '랜덤 문서 삭제 성공' })
    @ApiResponse({ status: 500, description: '서버 오류' })
    async deleteRandomDocuments() {
        // TODO: 실제 삭제 로직 구현
        await this.createRandomDocumentsUseCase.deleteAll();
        return {
            message: '랜덤 문서 삭제가 완료되었습니다.',
            data: {
                deletedCount: 0,
            },
        };
    }
}
