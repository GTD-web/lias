import { Module } from '@nestjs/common';
import { TemplateContext } from './template.context';
import { TemplateQueryService } from './template-query.service';
import { ApproverMappingService } from './approver-mapping.service';
import { DomainDocumentTemplateModule } from '../../domain/document-template/document-template.module';
import { DomainApprovalStepTemplateModule } from '../../domain/approval-step-template/approval-step-template.module';
import { DomainCategoryModule } from '../../domain/category/category.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';

@Module({
    imports: [
        DomainDocumentTemplateModule,
        DomainApprovalStepTemplateModule,
        DomainCategoryModule,
        DomainEmployeeModule,
        DomainDepartmentModule,
    ],
    providers: [TemplateContext, TemplateQueryService, ApproverMappingService],
    exports: [TemplateContext, TemplateQueryService, ApproverMappingService],
})
export class TemplateModule {}
