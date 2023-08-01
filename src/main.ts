import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApplicationConfig } from './config/application.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ServerPort = ApplicationConfig.serverPort;

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(ServerPort);

  Logger.log(`Server is ready at http://localhost:${ServerPort}}`);
}
bootstrap();
