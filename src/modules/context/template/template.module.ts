import { Module } from '@nestjs/common';
import { TemplateContext } from './template.context';

@Module({
    imports: [],
    providers: [TemplateContext],
    exports: [TemplateContext],
})
export class TemplateModule {}
