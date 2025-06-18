import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { DocumentService } from '../document.service';
import {
    CreateFormApprovalLineDto,
    FormApprovalLineResponseDto,
    UpdateFormApprovalLineDto,
} from '../dtos/approval-line.dto';
import { ApprovalLineType } from 'src/common/enums/approval.enum';

@ApiTags('결재선')
@ApiBearerAuth()
@Controller('approval-lines')
export class ApprovalLineController {
    constructor(private readonly documentService: DocumentService) {}

    @Post('')
    @ApiOperation({ summary: '결재선 생성' })
    @ApiDataResponse({
        status: 200,
        description: '결재선을 성공적으로 생성했습니다.',
        type: FormApprovalLineResponseDto,
    })
    async createApprovalLine(
        @Body() createFormApprovalLineDto: CreateFormApprovalLineDto,
    ): Promise<FormApprovalLineResponseDto> {
        return {
            formApprovalLineId: '1',
            name: '결재선 1',
            description: '결재선 1 설명',
            type: ApprovalLineType.COMMON,
            isActive: true,
            order: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            formApprovalSteps: [],
        };
    }

    @Get('')
    @ApiOperation({ summary: '결재선 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '결재선 목록을 성공적으로 조회했습니다.',
        type: [FormApprovalLineResponseDto],
    })
    async findAllApprovalLines(): Promise<FormApprovalLineResponseDto[]> {
        return [];
    }

    @Get(':id')
    @ApiOperation({ summary: '결재선 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '결재선을 성공적으로 상세 조회했습니다.',
        type: FormApprovalLineResponseDto,
    })
    async findApprovalLineById(@Param('id') id: string): Promise<FormApprovalLineResponseDto> {
        return null;
    }

    @Patch(':id')
    @ApiOperation({ summary: '결재선 수정' })
    @ApiDataResponse({
        status: 200,
        description: '결재선을 성공적으로 수정했습니다.',
        type: FormApprovalLineResponseDto,
    })
    async updateApprovalLineById(
        @Param('id') id: string,
        @Body() updateFormApprovalLineDto: UpdateFormApprovalLineDto,
    ): Promise<FormApprovalLineResponseDto> {
        return null;
    }

    @Delete(':id')
    @ApiOperation({ summary: '결재선 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '결재선을 성공적으로 삭제했습니다.',
        type: 'boolean',
    })
    async deleteApprovalLineById(@Param('id') id: string): Promise<boolean> {
        return true;
    }
}
