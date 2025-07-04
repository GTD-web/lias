import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentForm, DocumentType, FormApprovalLine, FormApprovalStep } from 'src/database/entities';
import { DomainDocumentFormModule } from 'src/modules/domain/document-form/document-form.module';
import { DomainDocumentTypeModule } from 'src/modules/domain/document-type/document-type.module';
import { DomainFormApprovalLineModule } from 'src/modules/domain/form-approval-line/form-approval-line.module';
import { DomainFormApprovalStepModule } from 'src/modules/domain/form-approval-step/form-approval-step.module';
import { DocumentFormController } from './controllers/document-form.controller';
import { FormTypeController } from './controllers/form-type.controllers';
import { ApprovalLineController } from './controllers/approval-line.controller';
import { DocumentService } from './document.service';
import * as ApprovalLineUsecases from './usecases/approval-line';
import * as FormTypeUsecases from './usecases/form-type';
import * as DocumentFormUsecases from './usecases/document-form';
import { DomainDepartmentModule } from 'src/modules/domain/department/department.module';
import { DomainEmployeeModule } from 'src/modules/domain/employee/employee.module';

@Module({
    imports: [
        // TypeOrmModule.forFeature([DocumentForm, DocumentType, FormApprovalLine, FormApprovalStep]),
        DomainDocumentFormModule,
        DomainDocumentTypeModule,
        DomainFormApprovalLineModule,
        DomainFormApprovalStepModule,
        DomainDepartmentModule,
        DomainEmployeeModule,
    ],
    controllers: [ApprovalLineController, FormTypeController, DocumentFormController],
    providers: [
        DocumentService,
        ...Object.values(ApprovalLineUsecases),
        ...Object.values(FormTypeUsecases),
        ...Object.values(DocumentFormUsecases),
    ],
    exports: [],
})
export class DocumentModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes({
            path: 'document',
            method: RequestMethod.ALL,
        });
    }
}
