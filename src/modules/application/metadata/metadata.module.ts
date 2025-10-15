import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataWebhookController } from './controllers/webhook.controller';

import { DomainEmployeeModule } from 'src/modules/domain/employee/employee.module';
import { DomainDepartmentModule } from 'src/modules/domain/department/department.module';
import { DomainPositionModule } from 'src/modules/domain/position/position.module';
import { DomainRankModule } from 'src/modules/domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from 'src/modules/domain/employee-department-position/employee-department-position.module';
import * as usecases from './usecases';

@Module({
    imports: [
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
    ],
    controllers: [MetadataController, MetadataWebhookController],
    providers: [MetadataService, ...Object.values(usecases)],
    exports: [MetadataService],
})
export class MetadataModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes({
            path: 'metadata',
            method: RequestMethod.ALL,
        });
    }
}
