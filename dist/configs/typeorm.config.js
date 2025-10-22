"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const list_1 = require("../modules_v2/domain/list");
const typeOrmConfig = (configService) => {
    return {
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: list_1.EntityListV2,
        schema: 'public',
        synchronize: configService.get('NODE_ENV') === 'local',
        ssl: configService.get('database.port') === 6543,
        extra: {
            ssl: configService.get('database.port') === 6543 ? { rejectUnauthorized: false } : null,
        },
    };
};
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map