import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApprovalLine } from '../../../database/entities';
import { DomainFormApprovalLineService } from './form-approval-line.service';
import { DomainFormApprovalLineRepository } from './form-approval-line.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FormApprovalLine])],
    providers: [DomainFormApprovalLineService, DomainFormApprovalLineRepository],
    exports: [DomainFormApprovalLineService],
})
export class FormApprovalLineModule {}
