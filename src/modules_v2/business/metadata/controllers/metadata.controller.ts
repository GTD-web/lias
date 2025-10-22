import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { SyncAllMetadataUsecase } from '../usecases/sync-all-metadata.usecase';
import { SyncMetadataResponseDto } from '../dtos';

/**
 * 메타데이터 동기화 컨트롤러
 * 외부 SSO API에서 메타데이터를 가져와 동기화합니다.
 */
@ApiTags('메타데이터 동기화')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MetadataController {
    constructor(private readonly syncAllMetadataUsecase: SyncAllMetadataUsecase) {}

    @Post('sync')
    @ApiOperation({
        summary: '메타데이터 전체 동기화',
        description: '외부 SSO API에서 메타데이터(부서, 직원, 직급 등)를 가져와 전체 동기화합니다.',
    })
    @ApiResponse({
        status: 200,
        description: '메타데이터 동기화 성공',
        type: SyncMetadataResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    @ApiResponse({
        status: 500,
        description: '메타데이터 동기화 실패',
    })
    async syncMetadata(): Promise<SyncMetadataResponseDto> {
        return await this.syncAllMetadataUsecase.execute();
    }
}
