import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApprovalStep } from '../../../database/entities';
import { DomainFormApprovalStepService } from './form-approval-step.service';
import { DomainFormApprovalStepRepository } from './form-approval-step.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FormApprovalStep])],
    providers: [DomainFormApprovalStepService, DomainFormApprovalStepRepository],
    exports: [DomainFormApprovalStepService],
})
export class FormApprovalStepModule {}
