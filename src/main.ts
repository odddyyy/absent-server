import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './shared/constants/env.constant';
import { ErrorHandler } from './shared/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const port = PORT;
  app.useGlobalFilters(new ErrorHandler());
  app.enableCors();
  await app.listen(port);
  Logger.verbose(`========== ABSENT SYSTEM STARTED ON PORT ${port} ==========`);
}
bootstrap();
