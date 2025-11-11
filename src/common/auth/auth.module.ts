import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { DomainEmployeeModule } from '../../modules/domain/employee/employee.module';

/**
 * 인증 모듈 (V2)
 *
 * JWT 기반 인증을 위한 전역 모듈
 * - JwtStrategy: JWT 토큰 검증 및 사용자 정보 추출
 * - JwtAuthGuard: JWT 인증 가드
 */
@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get('jwt.expiresIn') || '1h',
                },
            }),
        }),
        DomainEmployeeModule,
    ],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [JwtStrategy, JwtAuthGuard, JwtModule, PassportModule],
})
export class AuthModule {}
