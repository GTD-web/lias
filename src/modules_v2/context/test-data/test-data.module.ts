import { Module } from '@nestjs/common';
import { TestDataContext } from './test-data.context';
import { DomainFormModule } from '../../domain/form/form.module';
import { DomainDocumentModule } from '../../domain/document/document.module';
import { DomainApprovalLineTemplateModule } from '../../domain/approval-line-template/approval-line-template.module';
import { DomainApprovalStepTemplateModule } from '../../domain/approval-step-template/approval-step-template.module';
import { DomainApprovalLineSnapshotModule } from '../../domain/approval-line-snapshot/approval-line-snapshot.module';
import { DomainApprovalStepSnapshotModule } from '../../domain/approval-step-snapshot/approval-step-snapshot.module';
import { DomainFormVersionApprovalLineTemplateVersionModule } from '../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DomainPositionModule } from '../../domain/position/position.module';

@Module({
    imports: [
        DomainFormModule,
        DomainDocumentModule,
        DomainApprovalLineTemplateModule,
        DomainApprovalStepTemplateModule,
        DomainApprovalLineSnapshotModule,
        DomainApprovalStepSnapshotModule,
        DomainFormVersionApprovalLineTemplateVersionModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainEmployeeDepartmentPositionModule,
        DomainPositionModule,
    ],
    providers: [TestDataContext],
    exports: [TestDataContext],
})
export class TestDataContextModule {}
