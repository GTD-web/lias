import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/document.entity';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainApprovalStepModule } from '../../domain/approval-step/approval-step.module';
import { DomainDocumentTypeModule } from 'src/modules/domain/document-type/document-type.module';
import { DomainDocumentFormModule } from 'src/modules/domain/document-form/document-form.module';
import { DomainDepartmentModule } from 'src/modules/domain/department/department.module';
import { DomainFileModule } from 'src/modules/domain/file/file.module';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { Employee } from 'src/database/entities/employee.entity';
import { DocumentType } from 'src/database/entities/document-type.entity';
import { DocumentForm } from 'src/database/entities/document-form.entity';
import { Department } from 'src/database/entities/department.entity ';
import { File } from 'src/database/entities/file.entity';
import * as ApprovalUsecases from './usecases/approval';
import { ApprovalController } from './controllers/approval.controller';
import { CreateRandomDocumentsUseCase } from './usecases/test/create-random-documents.usecase';
import { RandomDocumentsController } from './controllers/random-documents.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Document, ApprovalStep, Employee, DocumentType, DocumentForm, Department, File]),
        DomainDocumentModule,
        DomainEmployeeModule,
        DomainApprovalStepModule,
        DomainDocumentTypeModule,
        DomainDocumentFormModule,
        DomainDepartmentModule,
        DomainFileModule,
    ],
    controllers: [ApprovalController, RandomDocumentsController],
    providers: [ApprovalService, ...Object.values(ApprovalUsecases), CreateRandomDocumentsUseCase],
    exports: [ApprovalService],
})
export class ApprovalModule {}
