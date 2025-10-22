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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const env_config_1 = require("./configs/env.config");
const auth_module_1 = require("./common/auth/auth.module");
const business_1 = require("./modules_v2/business");
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
            core_1.RouterModule.register([
                {
                    path: 'metadata',
                    module: business_1.MetadataModule,
                },
                {
                    path: 'v2/approval-flow',
                    module: business_1.ApprovalFlowBusinessModule,
                },
                {
                    path: 'v2/document',
                    module: business_1.DocumentBusinessModule,
                },
                {
                    path: 'v2/approval-process',
                    module: business_1.ApprovalProcessBusinessModule,
                },
                {
                    path: 'v2/test-data',
                    module: business_1.TestDataBusinessModule,
                },
            ]),
            auth_module_1.AuthModule,
            business_1.MetadataModule,
            business_1.ApprovalFlowBusinessModule,
            business_1.DocumentBusinessModule,
            business_1.ApprovalProcessBusinessModule,
            business_1.TestDataBusinessModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map