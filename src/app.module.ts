import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './configs/typeorm.config';
import { EntityList } from './database/entities/list';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_Config, JWT_CONFIG } from './configs/env.config';
import { ApiDocService } from './common/documents/api-doc.service';
import { DbDocService } from './common/documents/db-doc.service';
import { DocumentModule } from './modules/application/document/document.module';
import { AuthModule } from './modules/application/authorization/auth.module';
import { MetadataModule } from './modules/application/metadata/metadata.module';

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
        TypeOrmModule.forFeature(EntityList),
        RouterModule.register([
            {
                path: 'document',
                module: DocumentModule,
            },
            {
                path: 'metadata',
                module: MetadataModule,
            },
        ]),

        AuthModule,
        MetadataModule,
        DocumentModule,
    ],
    controllers: [AppController],
    providers: [AppService, ApiDocService, DbDocService],
})
export class AppModule {}
