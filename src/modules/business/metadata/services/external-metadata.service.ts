import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

/**
 * ExternalMetadataService
 * 외부 SSO API로부터 메타데이터를 가져오는 서비스
 */
@Injectable()
export class ExternalMetadataService {
    private readonly logger = new Logger(ExternalMetadataService.name);
    private readonly ssoApiUrl: string;

    constructor() {
        this.ssoApiUrl = process.env.SSO_API_URL || '';
        if (!this.ssoApiUrl) {
            this.logger.warn('SSO_API_URL 환경변수가 설정되지 않았습니다.');
        }
    }

    /**
     * 외부 API에서 전체 조직 메타데이터를 가져옵니다.
     */
    async fetchAllMetadata(): Promise<any> {
        this.logger.log('외부 API에서 메타데이터 조회 시작');

        try {
            const url = `${this.ssoApiUrl}/api/organization/export/all`;
            this.logger.debug(`API 호출: ${url}`);

            const response = await axios.get(url, {
                timeout: 30000, // 30초 타임아웃
            });

            this.logger.log(
                `메타데이터 조회 완료: ${response.data.totalCounts?.departments || 0}개 부서, ${response.data.totalCounts?.employees || 0}명 직원`,
            );

            return response.data;
        } catch (error) {
            this.logger.error('외부 API에서 메타데이터 조회 실패', error);
            throw new Error(`메타데이터 조회 실패: ${error.message}`);
        }
    }
}
