import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('PORT')
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
