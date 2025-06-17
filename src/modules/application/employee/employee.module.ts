import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../../database/entities';
import { EmployeeService } from './employee.service';

import { UserEmployeeController } from './controllers/employee.controller';
import { DomainEmployeeModule } from 'src/modules/domain/employee/employee.module';

@Module({
    imports: [DomainEmployeeModule, TypeOrmModule.forFeature([Employee])],
    controllers: [UserEmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
