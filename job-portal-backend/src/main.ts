import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // kasih IP saja
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`app run at port ${port}`);
  });
}
bootstrap();
