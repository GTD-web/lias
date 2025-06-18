import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalStep } from '../../../database/entities';
import { DomainApprovalStepService } from './approval-step.service';
import { DomainApprovalStepRepository } from './approval-step.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalStep])],
    providers: [DomainApprovalStepService, DomainApprovalStepRepository],
    exports: [DomainApprovalStepService],
})
export class DomainApprovalStepModule {}
