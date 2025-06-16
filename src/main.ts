import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/role.guard';
import { RequestInterceptor } from './common/interceptors/request.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ENV } from './configs/env.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // const isProduction = process.env.NODE_ENV === 'production';
    // app.enableCors({
    //     origin: isProduction
    //         ? function (origin, callback) {
    //               console.log('isProduction :', isProduction);
    //               console.log('origin :', origin);
    //               const whitelist = [
    //                   'https://lrms.lumir.space',
    //                   'https://rms-backend-iota.vercel.app',
    //                   'https://lrms-dev.lumir.space',
    //                   'http://localhost:3002',
    //               ];
    //               if (!isProduction || !origin || whitelist.includes(origin)) {
    //                   callback(null, true);
    //               } else {
    //                   callback(new Error('Not allowed by CORS'));
    //               }
    //           }
    //         : true,
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //     credentials: true,
    // });

    app.setGlobalPrefix('api');
    // app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)), new RolesGuard(app.get(Reflector)));
    // 전역 인터셉터 등록
    // app.useGlobalInterceptors(new RequestInterceptor(), new ResponseInterceptor(), new ErrorInterceptor());
    // app.useGlobalPipes(new ValidationPipe({ transform: true }));

    setupSwagger(app, []);
    await app.listen(ENV.APP_PORT || 3000);
}
bootstrap();
