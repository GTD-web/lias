import { Module } from '@nestjs/common';
import { TemplateController } from './controllers/template.controller';
import { CategoryController } from './controllers/category.controller';
import { TemplateService } from './services/template.service';
import { TemplateModule as TemplateContextModule } from '../../context/template/template.module';

/**
 * 템플릿 비즈니스 모듈
 * 문서 템플릿과 결재단계 템플릿을 함께 관리하는 API 엔드포인트를 제공합니다.
 */
@Module({
    imports: [TemplateContextModule],
    controllers: [TemplateController, CategoryController],
    providers: [TemplateService],
})
export class TemplateBusinessModule {}
