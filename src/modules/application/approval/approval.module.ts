import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalDraftController } from './controllers/document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/document.entity';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainApprovalStepModule } from '../../domain/approval-step/approval-step.module';
import { DomainDocumentTypeModule } from 'src/modules/domain/document-type/document-type.module';
import { DomainFileModule } from 'src/modules/domain/file/file.module';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { Employee } from 'src/database/entities/employee.entity';
import { DocumentType } from 'src/database/entities/document-type.entity';
import { File } from 'src/database/entities/file.entity';
import * as ApprovalUsecases from './usecases/approval';
import * as DocumentUsecases from './usecases/document';
import { ApprovalController } from './controllers/approval.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Document, ApprovalStep, Employee, DocumentType, File]),
        DomainDocumentModule,
        DomainEmployeeModule,
        DomainApprovalStepModule,
        DomainDocumentTypeModule,
        DomainFileModule,
    ],
    controllers: [ApprovalDraftController, ApprovalController],
    providers: [ApprovalService, ...Object.values(ApprovalUsecases), ...Object.values(DocumentUsecases)],
    exports: [ApprovalService],
})
export class ApprovalModule {}
