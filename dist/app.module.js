"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_config_1 = require("./configs/typeorm.config");
const list_1 = require("./database/entities/list");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const env_config_1 = require("./configs/env.config");
const api_doc_service_1 = require("./common/documents/api-doc.service");
const db_doc_service_1 = require("./common/documents/db-doc.service");
const employee_module_1 = require("./modules/application/employee/employee.module");
const document_module_1 = require("./modules/application/document/document.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.DB_Config, env_config_1.JWT_CONFIG],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: typeorm_config_1.typeOrmConfig,
            }),
            typeorm_1.TypeOrmModule.forFeature(list_1.EntityList),
            core_1.RouterModule.register([
                {
                    path: 'document',
                    module: document_module_1.DocumentModule,
                },
            ]),
            document_module_1.DocumentModule,
            employee_module_1.EmployeeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, api_doc_service_1.ApiDocService, db_doc_service_1.DbDocService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map