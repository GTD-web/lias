import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainFormService } from './form.service';
import { DomainFormRepository } from './form.repository';
import { DomainFormVersionService } from './form-version.service';
import { DomainFormVersionRepository } from './form-version.repository';
import { Form } from './form.entity';
import { FormVersion } from './form-version.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Form, FormVersion])],
    providers: [DomainFormService, DomainFormRepository, DomainFormVersionService, DomainFormVersionRepository],
    exports: [DomainFormService, DomainFormVersionService],
})
export class DomainFormModule {}
