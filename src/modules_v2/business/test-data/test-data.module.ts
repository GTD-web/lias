import { Module } from '@nestjs/common';
import { TestDataContextModule } from '../../context/test-data/test-data.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { TestDataController } from './controllers/test-data.controller';
import { CreateTestDataUsecase, DeleteTestDataUsecase, GenerateTokenUsecase } from './usecases';

/**
 * TestDataBusinessModule
 *
 * 테스트 데이터 생성/삭제 및 JWT 토큰 생성을 위한 비즈니스 레이어
 */
@Module({
    imports: [TestDataContextModule, DomainEmployeeModule],
    controllers: [TestDataController],
    providers: [CreateTestDataUsecase, DeleteTestDataUsecase, GenerateTokenUsecase],
    exports: [CreateTestDataUsecase, DeleteTestDataUsecase, GenerateTokenUsecase],
})
export class TestDataBusinessModule {}
