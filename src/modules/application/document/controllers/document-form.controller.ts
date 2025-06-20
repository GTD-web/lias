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
        return await this.documentService.createDocumentForm(createDocumentFormDto);
    }

    @Get('')
    @ApiOperation({ summary: '문서양식 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식 목록을 성공적으로 조회했습니다.',
        type: [DocumentFormResponseDto],
    })
    async findAllDocumentForms(): Promise<DocumentFormResponseDto[]> {
        return await this.documentService.findDocumentForms();
    }

    @Get(':id')
    @ApiOperation({ summary: '문서양식 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 상세 조회했습니다.',
        type: DocumentFormResponseDto,
    })
    async findDocumentFormById(@Param('id') id: string): Promise<DocumentFormResponseDto> {
        return await this.documentService.findDocumentFormById(id);
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
        return await this.documentService.updateDocumentForm(id, updateDocumentFormDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '문서양식 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 삭제했습니다.',
        type: 'boolean',
    })
    async deleteDocumentFormById(@Param('id') id: string): Promise<boolean> {
        return await this.documentService.deleteDocumentForm(id);
    }
}
