import { Module } from '@nestjs/common';
import { DocumentController } from './controllers/document.controller';
import { DocumentService } from './services/document.service';
import { DocumentModule as DocumentContextModule } from '../../context/document/document.module';
import { TemplateModule as TemplateContextModule } from '../../context/template/template.module';
import { ApprovalProcessModule as ApprovalProcessContextModule } from '../../context/approval-process/approval-process.module';

/**
 * 문서 비즈니스 모듈
 * 문서 CRUD 및 기안 관련 API 엔드포인트를 제공합니다.
 */
@Module({
    imports: [DocumentContextModule, TemplateContextModule, ApprovalProcessContextModule],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentBusinessModule {}
