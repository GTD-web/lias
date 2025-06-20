import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './controllers/metadata.controller';
import { MetadataWebhookController } from './controllers/webhook.controller';

import { DomainEmployeeModule } from 'src/modules/domain/employee/employee.module';
import { DomainDepartmentModule } from 'src/modules/domain/department/department.module';
import * as usecases from './usecases';

@Module({
    imports: [DomainEmployeeModule, DomainDepartmentModule],
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
