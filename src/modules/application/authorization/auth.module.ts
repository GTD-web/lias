import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './strategies/jwt.strategy';
import { Employee } from '../../../database/entities/employee.entity';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';

@Module({
    imports: [PassportModule, DomainEmployeeModule, TypeOrmModule.forFeature([Employee])],
    providers: [JwtStrategy],
    controllers: [],
    exports: [JwtStrategy],
})
export class AuthModule {}
