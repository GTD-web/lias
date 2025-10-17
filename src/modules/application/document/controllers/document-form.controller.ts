import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { DocumentService } from '../document.service';
import { CreateDocumentFormDto, DocumentFormResponseDto, UpdateDocumentFormDto } from '../dtos/document-form.dto';
import { ApprovalLineType } from 'src/common/enums/approval.enum';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData, PaginationMetaDto } from 'src/common/dtos/pagination-response.dto';
import { Employee } from 'src/database/entities/employee.entity';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('문서양식')
// @ApiBearerAuth()
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
        isPaginated: true,
    })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    async findAllDocumentForms(@Query() query: PaginationQueryDto): Promise<PaginationData<DocumentFormResponseDto>> {
        return await this.documentService.findDocumentForms(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '문서양식 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식을 성공적으로 상세 조회했습니다.',
        type: DocumentFormResponseDto,
    })
    async findDocumentFormById(@User() user: Employee, @Param('id') id: string): Promise<DocumentFormResponseDto> {
        console.log('id', id);
        return await this.documentService.findDocumentFormById(id, user);
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
