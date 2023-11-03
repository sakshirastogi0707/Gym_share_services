"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const sentry_filter_1 = require("./utils/sentry.filter");
const cookieParser = require("cookie-parser");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Gym Share Client Service Api')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.use(cookieParser());
    if (process.env.NODE_ENV !== 'local') {
        Sentry.init({
            dsn: process.env.DSN,
            tracesSampleRate: 1.0,
        });
        app.use(Sentry.Handlers.requestHandler());
        app.use(Sentry.Handlers.errorHandler());
        const { httpAdapter } = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new sentry_filter_1.SentryExceptionFilter(httpAdapter));
    }
    app.use('/static', express.static('public'));
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map