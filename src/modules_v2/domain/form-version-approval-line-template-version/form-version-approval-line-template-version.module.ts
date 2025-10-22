import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainFormVersionApprovalLineTemplateVersionService } from './form-version-approval-line-template-version.service';
import { DomainFormVersionApprovalLineTemplateVersionRepository } from './form-version-approval-line-template-version.repository';
import { FormVersionApprovalLineTemplateVersion } from './form-version-approval-line-template-version.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FormVersionApprovalLineTemplateVersion])],
    providers: [
        DomainFormVersionApprovalLineTemplateVersionService,
        DomainFormVersionApprovalLineTemplateVersionRepository,
    ],
    exports: [DomainFormVersionApprovalLineTemplateVersionService],
})
export class DomainFormVersionApprovalLineTemplateVersionModule {}
