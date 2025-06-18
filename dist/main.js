"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const request_interceptor_1 = require("./common/interceptors/request.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
const common_1 = require("@nestjs/common");
const swagger_1 = require("./common/swagger/swagger");
const env_config_1 = require("./configs/env.config");
const dto = require("./common/dtos");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new request_interceptor_1.RequestInterceptor(), new response_interceptor_1.ResponseInterceptor(), new error_interceptor_1.ErrorInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    (0, swagger_1.setupSwagger)(app, Object.values(dto));
    await app.listen(env_config_1.ENV.APP_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map