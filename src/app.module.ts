import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_Config, JWT_CONFIG } from './configs/env.config';
import { ApiDocService } from './common/documents/api-doc.service';
import { DbDocService } from './common/documents/db-doc.service';
import { AuthModule } from './common/auth/auth.module';

import {
    MetadataModule,
    ApprovalFlowBusinessModule,
    DocumentBusinessModule,
    ApprovalProcessBusinessModule,
    TestDataBusinessModule,
} from './modules_v2/business';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [DB_Config, JWT_CONFIG],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        RouterModule.register([
            // {
            //     path: 'document',
            //     module: DocumentModule,
            // },
            {
                path: 'metadata',
                module: MetadataModule,
            },
            {
                path: 'approval-flow',
                module: ApprovalFlowBusinessModule,
            },
            {
                path: 'document',
                module: DocumentBusinessModule,
            },
            {
                path: 'approval-process',
                module: ApprovalProcessBusinessModule,
            },
            {
                path: 'test-data',
                module: TestDataBusinessModule,
            },
            // {
            //     path: 'approval',
            //     module: ApprovalModule,
            // },
        ]),

        AuthModule,
        MetadataModule,
        ApprovalFlowBusinessModule,
        DocumentBusinessModule,
        ApprovalProcessBusinessModule,
        TestDataBusinessModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
