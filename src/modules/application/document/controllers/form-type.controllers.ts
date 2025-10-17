import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { DocumentService } from '../document.service';
import { CreateDocumentTypeDto, DocumentTypeResponseDto, UpdateDocumentTypeDto } from '../dtos/form-type.dto';

@ApiTags('문서양식분류')
// @ApiBearerAuth()
@Controller('form-types')
export class FormTypeController {
    constructor(private readonly documentService: DocumentService) {}

    @Post('')
    @ApiOperation({ summary: '문서양식분류 생성' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식분류를 성공적으로 생성했습니다.',
        type: DocumentTypeResponseDto,
    })
    async createFormType(@Body() createDocumentTypeDto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
        return await this.documentService.createFormType(createDocumentTypeDto);
    }

    @Get('')
    @ApiOperation({ summary: '문서양식분류 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식분류 목록을 성공적으로 조회했습니다.',
        type: [DocumentTypeResponseDto],
    })
    async findAllFormTypes(): Promise<DocumentTypeResponseDto[]> {
        return await this.documentService.findFormTypes();
    }

    @Get(':id')
    @ApiOperation({ summary: '문서양식분류 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식분류를 성공적으로 상세 조회했습니다.',
        type: DocumentTypeResponseDto,
    })
    async findFormTypeById(@Param('id') id: string): Promise<DocumentTypeResponseDto> {
        return await this.documentService.findFormTypeById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '문서양식분류 수정' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식분류를 성공적으로 수정했습니다.',
        type: DocumentTypeResponseDto,
    })
    async updateFormTypeById(
        @Param('id') id: string,
        @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
    ): Promise<DocumentTypeResponseDto> {
        return await this.documentService.updateFormType(id, updateDocumentTypeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '문서양식분류 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '문서양식분류를 성공적으로 삭제했습니다.',
        type: 'boolean',
    })
    async deleteFormTypeById(@Param('id') id: string): Promise<boolean> {
        return await this.documentService.deleteFormType(id);
    }
}
