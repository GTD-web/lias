"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const list_1 = require("../modules_v2/domain/list");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
    database: process.env.POSTGRES_DB || 'resource-server',
    entities: list_1.EntityListV2,
    schema: 'public',
    synchronize: false,
    logging: process.env.NODE_ENV === 'local',
    ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543,
    extra: {
        ssl: parseInt(process.env.POSTGRES_PORT, 10) === 6543 ? { rejectUnauthorized: false } : null,
    },
});
//# sourceMappingURL=data-source.js.map