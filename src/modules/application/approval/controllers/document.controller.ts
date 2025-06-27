import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApprovalService } from '../approval.service';
import { CreateDraftDocumentDto, UpdateDraftDocumentDto, ApprovalResponseDto } from '../dtos';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { User } from 'src/common/decorators/user.decorator';
import { Employee } from 'src/database/entities/employee.entity';

@ApiTags('기안 문서 관리')
@Controller('documents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApprovalDraftController {
    constructor(private readonly approvalService: ApprovalService) {}

    @Post()
    @ApiOperation({ summary: '기안 문서 생성' })
    @ApiResponse({ status: 201, description: '기안 문서 생성 성공', type: ApprovalResponseDto })
    async createDraft(@User() user: Employee, @Body() draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto> {
        return this.approvalService.createDraft(user, draftData);
    }

    // @Get()
    // @ApiOperation({ summary: '기안 문서 목록 조회' })
    // @ApiResponse({ status: 200, description: '기안 문서 목록 조회 성공', type: ApprovalResponseDto })
    // @ApiQuery({ name: 'page', type: Number, required: false })
    // @ApiQuery({ name: 'limit', type: Number, required: false })
    // @ApiQuery({
    //     name: 'status',
    //     type: String,
    //     required: false,
    //     isArray: true,
    //     description: Object.values(ApprovalStatus).join(' / '),
    // })
    // @ApiQuery({
    //     name: 'stepType',
    //     type: String,
    //     required: false,
    //     isArray: true,
    //     description: Object.values(ApprovalStepType).join(' / '),
    // })
    // async getDraftList(
    //     @User() user: Employee,
    //     @Query() query: PaginationQueryDto,
    //     @Query('status') status: ApprovalStatus | ApprovalStatus[],
    //     @Query('stepType') stepType: ApprovalStepType | ApprovalStepType[],
    // ): Promise<PaginationData<ApprovalResponseDto>> {
    //     return this.approvalService.getDraftList(user, query, status, stepType);
    // }

    // @Get(':id')
    // @ApiOperation({ summary: '기안 문서 조회' })
    // @ApiResponse({ status: 200, description: '기안 문서 조회 성공', type: ApprovalResponseDto })
    // async getDraft(@Param('id') id: string): Promise<ApprovalResponseDto> {
    //     return this.approvalService.getDraft(id);
    // }

    // @Patch(':id')
    // @ApiOperation({ summary: '기안 문서 수정' })
    // @ApiResponse({ status: 200, description: '기안 문서 수정 성공', type: ApprovalResponseDto })
    // async updateDraft(
    //     @Param('id') id: string,
    //     @Body() draftData: UpdateDraftDocumentDto,
    // ): Promise<ApprovalResponseDto> {
    //     return this.approvalService.updateDraft(id, draftData);
    // }

    // @Delete(':id')
    // @ApiOperation({ summary: '기안 문서 삭제' })
    // @ApiResponse({ status: 204, description: '기안 문서 삭제 성공' })
    // async deleteDraft(@Param('id') id: string): Promise<void> {
    //     return this.approvalService.deleteDraft(id);
    // }
}
