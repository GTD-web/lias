import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { MetadataService } from '../metadata.service';
import { MetadataResponseDto } from '../dtos/metadata-response.dto';

@ApiTags('메타데이터')
// @ApiBearerAuth()
@Controller('')
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('')
    @ApiOperation({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' })
    @ApiDataResponse({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [MetadataResponseDto],
    })
    async findAllEmplyeesByDepartment(): Promise<MetadataResponseDto> {
        return this.metadataService.findAllEmplyeesByDepartment();
    }
}
