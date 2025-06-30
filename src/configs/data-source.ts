import { DataSource } from 'typeorm';
import { EntityList } from '../database/entities/list';
import { join } from 'path';
import * as dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
    database: process.env.POSTGRES_DB || 'resource-server',
    entities: EntityList,
    schema: 'public',
    synchronize: false, // 마이그레이션 사용 시 false로 설정
    logging: process.env.NODE_ENV === 'local',
    migrations: [join(__dirname, '../common/migrations/*.ts')],
    migrationsRun: false,
    ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543,
    extra: {
        ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543 ? { rejectUnauthorized: false } : null,
    },
});
