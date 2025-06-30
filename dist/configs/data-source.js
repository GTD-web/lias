"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const list_1 = require("../database/entities/list");
const path_1 = require("path");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
    database: process.env.POSTGRES_DB || 'resource-server',
    entities: list_1.EntityList,
    schema: 'public',
    synchronize: false,
    logging: process.env.NODE_ENV === 'local',
    migrations: [(0, path_1.join)(__dirname, '../common/migrations/*.ts')],
    migrationsRun: false,
    ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543,
    extra: {
        ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543 ? { rejectUnauthorized: false } : null,
    },
});
//# sourceMappingURL=data-source.js.map