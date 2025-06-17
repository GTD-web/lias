"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./common/swagger/swagger");
const env_config_1 = require("./configs/env.config");
const dto = require("./common/dtos");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    (0, swagger_1.setupSwagger)(app, Object.values(dto));
    await app.listen(env_config_1.ENV.APP_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map