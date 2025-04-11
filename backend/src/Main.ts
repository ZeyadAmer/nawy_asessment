import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptiuonHandler } from './common/GlobalExceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptiuonHandler());
  await app.listen(8080);
}
bootstrap();
