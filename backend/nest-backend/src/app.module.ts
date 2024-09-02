import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AiModule } from './ai/ai.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { FlightModule } from './flight/flight.module';
import { HotelsModule } from './hotels/hotels.module';
import { AiService } from './ai/ai.service';
import { AiController } from './ai/ai.controller';
import { HttpModule } from '@nestjs/axios';
// import * as Joi from 'joi';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.string().required(),
      //   DB_PORT: Joi.number().default(5432),
      // }),
      load: [], // 필요에 따라 설정 파일을 추가
      cache: true,
      envFilePath: [
        `env/.env${process.env.NODE_ENV === 'production' ? '.production' : '.development'}.local`,
        // `env/.env.${process.env.NODE_ENV || 'production'}.local`,
        // `env/.env.${process.env.NODE_ENV || 'development'}.local`,
        'env/.env',
        '.env',
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('DB_DATABASE:', configService.get<string>('DB_DATABASE'));
        return typeOrmConfig(configService);
      },
    }),
    // FlightModule,
    AuthModule,
    UsersModule,
    HotelsModule,
    AiModule,
  ],
  controllers: [AppController, AiController],
  providers: [AppService, AiService],
})
export class AppModule {}
