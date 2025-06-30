"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const list_1 = require("../database/entities/list");
const path_1 = require("path");
const typeOrmConfig = (configService) => {
    return {
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: list_1.EntityList,
        schema: 'public',
        synchronize: configService.get('NODE_ENV') === 'local',
        migrations: [(0, path_1.join)(__dirname, '../common/migrations/*.ts')],
        migrationsRun: configService.get('database.port') === 6543,
        ssl: configService.get('database.port') === 6543,
        extra: {
            ssl: configService.get('database.port') === 6543 ? { rejectUnauthorized: false } : null,
        },
    };
};
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map