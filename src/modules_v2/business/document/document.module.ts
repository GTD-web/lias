import { Module } from '@nestjs/common';
import { DocumentModule as DocumentContextModule } from '../../context/document/document.module';
import { ApprovalFlowModule as ApprovalFlowContextModule } from '../../context/approval-flow/approval-flow.module';
import { DomainFormModule } from '../../domain/form/form.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DocumentController } from './controllers/document.controller';
import * as Usecases from './usecases';

@Module({
    imports: [
        DocumentContextModule,
        ApprovalFlowContextModule,
        DomainFormModule,
        DomainEmployeeDepartmentPositionModule, // SubmitDocumentUsecase에서 사용
    ],
    controllers: [DocumentController],
    providers: [
        Usecases.CreateDocumentUsecase,
        Usecases.UpdateDocumentUsecase,
        Usecases.SubmitDocumentUsecase,
        Usecases.CancelDocumentUsecase,
        Usecases.GetDocumentUsecase,
    ],
    exports: [
        Usecases.CreateDocumentUsecase,
        Usecases.UpdateDocumentUsecase,
        Usecases.SubmitDocumentUsecase,
        Usecases.CancelDocumentUsecase,
        Usecases.GetDocumentUsecase,
    ],
})
export class DocumentBusinessModule {}
