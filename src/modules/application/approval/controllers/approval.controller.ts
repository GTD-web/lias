import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApprovalService } from '../approval.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Employee, Document } from 'src/database/entities';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('결재 관리')
@Controller('')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApprovalController {
    constructor(private readonly approvalService: ApprovalService) {}

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
}
