import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const cookieParser = require('cookie-parser');
  const cors = require('cors');
  app.use(
    cors({
      credential: true,
      origin: 'http://localhost:5173',
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter())
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
