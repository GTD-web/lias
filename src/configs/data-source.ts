import { DataSource } from 'typeorm';
import { EntityListV2 } from 'src/modules/domain/list';
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
    entities: EntityListV2,
    schema: 'public',
    synchronize: false, // 마이그레이션 사용 시 false로 설정
    logging: process.env.NODE_ENV === 'local',
    // migrations: [join(__dirname, '../common/migrations/*.ts')],
    // migrationsRun: false,
    // migrationsTransactionMode: 'each', // 각 마이그레이션이 자체 트랜잭션 설정을 사용할 수 있도록 허용
    ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543,
    extra: {
        ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543 ? { rejectUnauthorized: false } : null,
    },
});
