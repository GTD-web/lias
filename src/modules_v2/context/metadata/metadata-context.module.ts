import { Module } from '@nestjs/common';
import { MetadataContext } from './metadata.context';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';

@Module({
    imports: [
        DomainDepartmentModule,
        DomainPositionModule,
        DomainEmployeeModule,
        DomainEmployeeDepartmentPositionModule,
    ],
    providers: [MetadataContext],
    exports: [MetadataContext],
})
export class MetadataContextModule {}
