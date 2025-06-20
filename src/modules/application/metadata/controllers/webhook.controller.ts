import { Controller, Get, Post, Body } from '@nestjs/common';
import { MetadataService } from '../metadata.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/decorators/public.decorator';
// import { Throttle } from '@nestjs/throttler';
import { MMSEmployeeWebhookRequestDto } from '../dtos/mms-employee-response.dto';

@ApiTags('메타데이터 웹훅')
@ApiBearerAuth()
@Controller('webhook')
export class MetadataWebhookController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('sync')
    async syncMetadata() {
        await this.metadataService.syncDepartments();
        await this.metadataService.syncEmployees();
        return { message: 'Metadata synced successfully' };
    }
}
