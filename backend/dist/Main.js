"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const GlobalExceptionHandler_1 = require("./common/GlobalExceptionHandler");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new GlobalExceptionHandler_1.GlobalExceptiuonHandler());
    await app.listen(8080);
}
bootstrap();
