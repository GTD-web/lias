import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainApprovalLineTemplateService } from './approval-line-template.service';
import { DomainApprovalLineTemplateRepository } from './approval-line-template.repository';
import { DomainApprovalLineTemplateVersionService } from './approval-line-template-version.service';
import { DomainApprovalLineTemplateVersionRepository } from './approval-line-template-version.repository';
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { ApprovalLineTemplateVersion } from './approval-line-template-version.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalLineTemplate, ApprovalLineTemplateVersion])],
    providers: [
        DomainApprovalLineTemplateService,
        DomainApprovalLineTemplateRepository,
        DomainApprovalLineTemplateVersionService,
        DomainApprovalLineTemplateVersionRepository,
    ],
    exports: [DomainApprovalLineTemplateService, DomainApprovalLineTemplateVersionService],
})
export class DomainApprovalLineTemplateModule {}
