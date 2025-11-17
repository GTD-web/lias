import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * Health Check 엔드포인트 (Vercel Cron Job용)
     * Cold Start 방지를 위해 5분마다 호출됩니다.
     */
    @Get('health')
    healthCheck(): { status: string; timestamp: string; message: string } {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            message: 'Server is alive - Cold start prevented',
        };
    }
}
