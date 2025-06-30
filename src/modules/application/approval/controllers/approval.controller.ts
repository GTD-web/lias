import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApprovalService } from '../approval.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Employee, Document, ApprovalStep } from 'src/database/entities';
import { User } from 'src/common/decorators/user.decorator';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalResponseDto } from '../dtos/approval-draft.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { DocumentListType } from 'src/common/enums/approval.enum';
import { ApiDataResponse } from 'src/common/decorators/api-responses.decorator';
import { CreateDraftDocumentDto } from '../dtos';

@ApiTags('결재 관리')
@Controller('')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApprovalController {
    constructor(private readonly approvalService: ApprovalService) {}

    @Post('document')
    @ApiOperation({ summary: '기안 문서 생성' })
    @ApiResponse({ status: 201, description: '기안 문서 생성 성공', type: String })
    async createDraft(@User() user: Employee, @Body() draftData: CreateDraftDocumentDto): Promise<string> {
        return this.approvalService.createDraft(user, draftData);
    }

    // 승인, 반려
    @Post(':documentId/approve')
    @ApiOperation({ summary: '결재 승인' })
    @ApiResponse({ status: 200, description: '결재 승인 성공' })
    async approve(@Param('documentId') documentId: string, @User() user: Employee): Promise<void> {
        await this.approvalService.approve(user, documentId);
    }

    @Post(':documentId/reject')
    @ApiOperation({ summary: '결재 반려' })
    @ApiResponse({ status: 200, description: '결재 반려 성공' })
    async reject(@Param('documentId') documentId: string, @User() user: Employee): Promise<void> {
        await this.approvalService.reject(user, documentId);
    }

    // 시행, 열람

    @Post(':documentId/implementation')
    @ApiOperation({ summary: '시행' })
    @ApiResponse({ status: 200, description: '시행 성공' })
    async implementation(@Param('documentId') documentId: string, @User() user: Employee): Promise<void> {
        await this.approvalService.implementation(user, documentId);
    }

    @Post(':documentId/reference')
    @ApiOperation({ summary: '열람' })
    @ApiResponse({ status: 200, description: '열람 성공' })
    async reference(@Param('documentId') documentId: string, @User() user: Employee): Promise<void> {
        await this.approvalService.reference(user, documentId);
    }

    @Get('documents')
    @ApiOperation({ summary: '결재 문서 조회' })
    @ApiDataResponse({
        status: 200,
        description: '결재선을 성공적으로 수정했습니다.',
        type: ApprovalResponseDto,
        isPaginated: true,
    })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({
        name: 'listType',
        type: String,
        required: true,
        enum: DocumentListType,
        description: `결재 문서 조회 타입 (${Object.values(DocumentListType).join(',')})`,
    })
    async getDocuments(
        @User() user: Employee,
        @Query() query: PaginationQueryDto,
        @Query('listType') listType: DocumentListType,
    ): Promise<PaginationData<ApprovalResponseDto>> {
        return this.approvalService.getApprovalDocuments(user, query, listType);
    }
}
