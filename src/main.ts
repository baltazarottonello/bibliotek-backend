import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: process.env.CORS
      ? {
          origin: '*',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }
      : false,
  });

  app.use(bodyParser.json({ limit: '1mb' }));
  await app.listen(process.env.API_PORT || 3000);
}

bootstrap();
