import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
