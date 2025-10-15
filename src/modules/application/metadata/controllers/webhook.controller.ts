import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { MetadataService } from '../metadata.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/decorators/public.decorator';
// import { Throttle } from '@nestjs/throttler';
import { MMSEmployeeWebhookRequestDto } from '../dtos/mms-employee-response.dto';
import { waitUntil } from '@vercel/functions';

@ApiTags('메타데이터 웹훅')
@Public()
@Controller('webhook')
export class MetadataWebhookController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('sync')
    @HttpCode(202) // 즉시 202 Accepted 응답
    async syncMetadata() {
        waitUntil(this.metadataService.syncDepartments());
        waitUntil(this.metadataService.syncEmployees());
        return { ok: true, acceptedAt: new Date().toISOString() };
    }

    @Get('sync-all')
    @HttpCode(202) // 즉시 202 Accepted 응답
    async syncAllMetadata() {
        waitUntil(this.metadataService.syncAllMetadata());
        return { ok: true, message: '전체 메타데이터 동기화 시작', acceptedAt: new Date().toISOString() };
    }
}
