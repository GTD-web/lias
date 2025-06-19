import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { DocumentService } from '../document.service';
import { CreateDocumentFormDto, DocumentFormResponseDto, UpdateDocumentFormDto } from '../dtos/document-form.dto';
import { ApprovalLineType } from 'src/common/enums/approval.enum';

@ApiTags('문서양식')
@ApiBearerAuth()
@Controller('forms')
export class DocumentFormController {
    constructor(private readonly documentService: DocumentService) {}

    @Post('')
    @ApiOperation({ summary: '문서양식 생성' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 생성했습니다.',
        type: DocumentFormResponseDto,
    })
    async createDocumentForm(@Body() createDocumentFormDto: CreateDocumentFormDto): Promise<DocumentFormResponseDto> {
        return {
            documentFormId: '1',
            name: '휴가신청서',
            description: '휴가 신청을 위한 문서 양식입니다.',
            template: '<div>문서 양식 템플릿</div>',
            documentType: {
                documentTypeId: '1',
                name: 'VACATION',
                documentNumberCode: 'VAC-001',
            },
            formApprovalLine: {
                formApprovalLineId: '1',
                name: '결재선 1',
                description: '결재선 1 설명',
                type: ApprovalLineType.COMMON,
                isActive: true,
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                formApprovalSteps: [],
            },
            receiverInfo: [],
            implementerInfo: [],
        };
    }

    @Get('')
    @ApiOperation({ summary: '문서양식 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식 목록을 성공적으로 조회했습니다.',
        type: [DocumentFormResponseDto],
    })
    async findAllDocumentForms(): Promise<DocumentFormResponseDto[]> {
        return [];
    }

    @Get(':id')
    @ApiOperation({ summary: '문서양식 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 상세 조회했습니다.',
        type: DocumentFormResponseDto,
    })
    async findDocumentFormById(@Param('id') id: string): Promise<DocumentFormResponseDto> {
        return null;
    }

    @Patch(':id')
    @ApiOperation({ summary: '문서양식 수정' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 수정했습니다.',
        type: DocumentFormResponseDto,
    })
    async updateDocumentFormById(
        @Param('id') id: string,
        @Body() updateDocumentFormDto: UpdateDocumentFormDto,
    ): Promise<DocumentFormResponseDto> {
        return null;
    }

    @Delete(':id')
    @ApiOperation({ summary: '문서양식 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 삭제했습니다.',
        type: 'boolean',
    })
    async deleteDocumentFormById(@Param('id') id: string): Promise<boolean> {
        return true;
    }
}
