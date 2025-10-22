import { Injectable, Logger } from '@nestjs/common';
import { TestDataContext } from '../../../context/test-data/test-data.context';

/**
 * 테스트 데이터 삭제 Usecase
 */
@Injectable()
export class DeleteTestDataUsecase {
    private readonly logger = new Logger(DeleteTestDataUsecase.name);

    constructor(private readonly testDataContext: TestDataContext) {}

    /**
     * 모든 문서 및 결재 프로세스 삭제
     */
    async deleteAllDocuments() {
        this.logger.log('모든 문서 및 결재 프로세스 삭제 요청');

        const result = await this.testDataContext.deleteAllDocuments();

        this.logger.log('모든 문서 및 결재 프로세스 삭제 완료');

        return result;
    }

    /**
     * 모든 결재선 및 양식 삭제
     */
    async deleteAllFormsAndTemplates() {
        this.logger.log('모든 결재선 및 양식 삭제 요청');

        const result = await this.testDataContext.deleteAllFormsAndTemplates();

        this.logger.log('모든 결재선 및 양식 삭제 완료');

        return result;
    }

    /**
     * 모든 테스트 데이터 삭제 (전체)
     */
    async deleteAll() {
        this.logger.log('모든 테스트 데이터 삭제 요청');

        // 1. 문서 및 결재 프로세스 삭제 (외래키 제약으로 인해 먼저 삭제)
        const documentsResult = await this.testDataContext.deleteAllDocuments();
        this.logger.log(`문서 삭제 완료: ${documentsResult.message}`);

        // 2. 결재선 및 양식 삭제
        const formsResult = await this.testDataContext.deleteAllFormsAndTemplates();
        this.logger.log(`결재선 및 양식 삭제 완료: ${formsResult.message}`);

        this.logger.log('모든 테스트 데이터 삭제 완료');

        return {
            success: true,
            message: `전체 삭제 완료: ${documentsResult.message}, ${formsResult.message}`,
        };
    }
}
