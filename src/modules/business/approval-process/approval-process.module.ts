import { Module } from '@nestjs/common';
import { ApprovalProcessController } from './controllers/approval-process.controller';
import { ApprovalProcessService } from './services/approval-process.service';
import { ApprovalProcessModule as ApprovalProcessContextModule } from '../../context/approval-process/approval-process.module';
import { NotificationContextModule } from '../../context/notification/notification.module';
import { DocumentModule } from '../../context/document/document.module';

/**
 * 결재 프로세스 비즈니스 모듈
 * 결재 승인/반려, 협의 완료, 시행 완료, 결재 취소 등의 API 엔드포인트를 제공합니다.
 */
@Module({
    imports: [ApprovalProcessContextModule, NotificationContextModule, DocumentModule],
    controllers: [ApprovalProcessController],
    providers: [ApprovalProcessService],
})
export class ApprovalProcessBusinessModule {}
