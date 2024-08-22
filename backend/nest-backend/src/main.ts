import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:5173', // 허용할 출처
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 자격 증명을 사용할 경우 true로 설정
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
