import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MetadataContextModule } from '../../context/metadata/metadata-context.module';

/**
 * Auth 비즈니스 모듈
 * 인증 관련 기능을 제공합니다.
 */
@Module({
    imports: [MetadataContextModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthBusinessModule {}
