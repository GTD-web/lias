import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainApprovalLineSnapshotService } from './approval-line-snapshot.service';
import { DomainApprovalLineSnapshotRepository } from './approval-line-snapshot.repository';
import { ApprovalLineSnapshot } from './approval-line-snapshot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ApprovalLineSnapshot])],
    providers: [DomainApprovalLineSnapshotService, DomainApprovalLineSnapshotRepository],
    exports: [DomainApprovalLineSnapshotService],
})
export class DomainApprovalLineSnapshotModule {}
