import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './strategies/jwt.strategy';
import { Employee } from '../../../database/entities/employee.entity';
import { AuthController } from './controllers/auth.controller';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { AuthService } from './auth.service';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { FindMeUsecase } from './usecases/find-me.usecase';

@Module({
    imports: [PassportModule, DomainEmployeeModule, TypeOrmModule.forFeature([Employee])],
    providers: [JwtStrategy, AuthService, SsoLoginUsecase, UpdateAuthInfoUsecase, FindMeUsecase],
    controllers: [AuthController],
    exports: [JwtStrategy],
})
export class AuthModule {}
