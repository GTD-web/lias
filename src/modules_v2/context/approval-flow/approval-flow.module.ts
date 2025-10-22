import { Module } from '@nestjs/common';
import { ApprovalFlowContext } from './approval-flow.context';
import { DomainFormModule } from '../../domain/form/form.module';
import { DomainApprovalLineTemplateModule } from '../../domain/approval-line-template/approval-line-template.module';
import { DomainApprovalStepTemplateModule } from '../../domain/approval-step-template/approval-step-template.module';
import { DomainApprovalLineSnapshotModule } from '../../domain/approval-line-snapshot/approval-line-snapshot.module';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';
import { DomainFormVersionApprovalLineTemplateVersionModule } from '../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';

@Module({
    imports: [
        DomainFormModule,
        DomainApprovalLineTemplateModule,
        DomainApprovalStepTemplateModule,
        DomainApprovalLineSnapshotModule,
        DomainApprovalStepSnapshotModule,
        DomainFormVersionApprovalLineTemplateVersionModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainEmployeeDepartmentPositionModule,
    ],
    providers: [ApprovalFlowContext],
    exports: [
        ApprovalFlowContext,
        // Domain 서비스들을 re-export하여 Business 레이어에서 사용 가능하게 함
        DomainFormModule,
        DomainApprovalLineTemplateModule,
        DomainApprovalStepTemplateModule,
        DomainApprovalLineSnapshotModule,
        DomainApprovalStepSnapshotModule,
        DomainFormVersionApprovalLineTemplateVersionModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainEmployeeDepartmentPositionModule,
    ],
})
export class ApprovalFlowModule {}
