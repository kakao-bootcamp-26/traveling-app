import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import session from 'express-session';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');

  const aiServerIp = configService.get<string>('AI_SERVER_IP');
  const aiServerPort = configService.get<string>('AI_SERVER_PORT');

  logger.log(`AI server IP: ${aiServerIp}`);
  logger.log(`AI server Port: ${aiServerPort}`);

  if (!aiServerIp || !aiServerPort) {
    throw new Error(
      'AI_SERVER_IP or AI_SERVER_PORT is not defined in the environment variables',
    );
  }

  // CORS 설정
  app.enableCors({
    origin: true,
    // origin: [
    //   // 'http://localhost:5173',
    //   // 'http://localhost:5000',
    //   // 'http://localhost:3000',
    // ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      secret: 'your-secret-key', // 강력한 비밀 키를 사용하세요
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1시간
      },
    }),
  );

  await app.listen(3000);
  logger.log(`Nest application is running on: ${await app.getUrl()}`);
}
bootstrap();
