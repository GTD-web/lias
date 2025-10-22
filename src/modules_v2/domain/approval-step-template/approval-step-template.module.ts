import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainApprovalStepTemplateService } from './approval-step-template.service';
import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { ApprovalStepTemplate } from './approval-step-template.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalStepTemplate])],
    providers: [DomainApprovalStepTemplateService, DomainApprovalStepTemplateRepository],
    exports: [DomainApprovalStepTemplateService],
})
export class DomainApprovalStepTemplateModule {}
