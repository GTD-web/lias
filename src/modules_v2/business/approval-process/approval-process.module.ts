import { Module } from '@nestjs/common';
import { ApprovalProcessModule as ApprovalProcessContextModule } from '../../context/approval-process/approval-process.module';
import { ApprovalProcessController } from './controllers/approval-process.controller';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import * as Usecases from './usecases';

@Module({
    imports: [
        ApprovalProcessContextModule,
        DomainDocumentModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainEmployeeDepartmentPositionModule,
    ],
    controllers: [ApprovalProcessController],
    providers: [
        Usecases.ApproveStepUsecase,
        Usecases.RejectStepUsecase,
        Usecases.CompleteAgreementUsecase,
        Usecases.CompleteImplementationUsecase,
        Usecases.CancelApprovalUsecase,
        Usecases.GetApprovalStatusUsecase,
    ],
    exports: [
        Usecases.ApproveStepUsecase,
        Usecases.RejectStepUsecase,
        Usecases.CompleteAgreementUsecase,
        Usecases.CompleteImplementationUsecase,
        Usecases.CancelApprovalUsecase,
        Usecases.GetApprovalStatusUsecase,
    ],
})
export class ApprovalProcessBusinessModule {}
