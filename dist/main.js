"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const role_guard_1 = require("./common/guards/role.guard");
const request_interceptor_1 = require("./common/interceptors/request.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
const common_1 = require("@nestjs/common");
const swagger_1 = require("./common/swagger/swagger");
const env_config_1 = require("./configs/env.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(app.get(core_1.Reflector)), new role_guard_1.RolesGuard(app.get(core_1.Reflector)));
    app.useGlobalInterceptors(new request_interceptor_1.RequestInterceptor(), new response_interceptor_1.ResponseInterceptor(), new error_interceptor_1.ErrorInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    (0, swagger_1.setupSwagger)(app, []);
    await app.listen(env_config_1.ENV.APP_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map