import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5000',
      'http://localhost:3000',
    ],
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
}
bootstrap();
