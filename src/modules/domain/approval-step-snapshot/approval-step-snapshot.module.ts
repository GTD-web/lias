import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainApprovalStepSnapshotService } from './approval-step-snapshot.service';
import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalStepSnapshot])],
    providers: [DomainApprovalStepSnapshotService, DomainApprovalStepSnapshotRepository],
    exports: [DomainApprovalStepSnapshotService],
})
export class DomainApprovalStepSnapshotModule {}
