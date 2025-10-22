import { Module } from '@nestjs/common';
import { ApprovalFlowController } from './controllers/approval-flow.controller';
import { ApprovalFlowModule as ApprovalFlowContextModule } from '../../context/approval-flow/approval-flow.module';
import {
    CreateFormWithApprovalLineUsecase,
    UpdateFormVersionUsecase,
    CloneApprovalLineTemplateUsecase,
    CreateApprovalLineTemplateVersionUsecase,
    CreateApprovalLineTemplateUsecase,
    CreateApprovalSnapshotUsecase,
    PreviewApprovalLineUsecase,
} from './usecases';

/**
 * ApprovalFlowBusinessModule
 *
 * 결재 흐름 관련 비즈니스 레이어
 * - Context 레이어를 의존
 * - Controller, Usecase 제공
 */
@Module({
    imports: [ApprovalFlowContextModule],
    controllers: [ApprovalFlowController],
    providers: [
        CreateFormWithApprovalLineUsecase,
        UpdateFormVersionUsecase,
        CloneApprovalLineTemplateUsecase,
        CreateApprovalLineTemplateVersionUsecase,
        CreateApprovalLineTemplateUsecase,
        CreateApprovalSnapshotUsecase,
        PreviewApprovalLineUsecase,
    ],
    exports: [
        CreateFormWithApprovalLineUsecase,
        UpdateFormVersionUsecase,
        CloneApprovalLineTemplateUsecase,
        CreateApprovalLineTemplateVersionUsecase,
        CreateApprovalLineTemplateUsecase,
        CreateApprovalSnapshotUsecase,
        PreviewApprovalLineUsecase,
    ],
})
export class ApprovalFlowBusinessModule {}
